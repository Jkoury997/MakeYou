const net = require('net')
const { saveHeartbeatDataBase, saveCountDataBase } = require('../databaseHandler'); // Ajusta la ruta según corresponda.
const {
  joinData,
  receiveDataEscape,
  sendDataEscape,
  checkHead,
  formatDate,
  parseDateMongoDB
} = require('./utils/utils')
const { crc16Modbus } = require('./utils/crc16')
const {
  saveHeartbeatData,
  saveCountData,
  getBusinessHours,
  getCycle,
  getDirection,
} = require('./data')
// 头部---head
const HEAD = [0x7e]
// 固定设备ID---Fixed device ID
const DEVICEID = [0xff, 0xff, 0xff, 0xff]
// 参数---parameter
const PARAM = [0x02]
// 尾部---tail
const END = [0x7d]
// 数组转Buffer---Array to Buffer
const bufferFromArray = arr => Buffer.from(arr)
class IRTCP {
  
  /**
   * @description: TCP 服务
   * @param {*} options.port 端口
   * @param {*} options.host 主机
   * @param {*} options.record 是否包含记录周期---Does it include a recording cycle
   */
  constructor(options) {
    this.host = options.host || '127.0.0.1'
    this.port = options.port || 8085
    this._count = 0
    this.dataBuffer = Buffer.alloc(0)
    this.hasRecord = options.record || false

    this.initTcp()
  }
  // 初始化TCP---Initialize TCP
  initTcp() {
    // 创建一个 TCP 服务实例
    const server = net.createServer()
    // 监听端口
    server.listen(this.port, this.host)
    server.on('listening', () =>
      // console.log(`TCP服务已开启在 ${this.host}:${this.port}`)
      console.log(`TCP service has been enabled on ${this.host}:${this.port}`)
    )
    // 监听连接
    server.on('connection', this.handleConnect.bind(this))
    // 关闭
    server.on('close', this.handleClose.bind(this))
    // 错误
    server.on('error', this.handleError.bind(this))
    
  }
  /**
   * @description: 监听接收到的数据---Listening to received data
   * @param {*} buffer
   * @param {*} socket
   * @return {*}
   */
  async handleData(buffer, socket) {
    let data = joinData(this.dataBuffer, buffer)
    if (!data.length) return
    this.dataBuffer = Buffer.alloc(0)
    // 转义
    data = receiveDataEscape(data)
    // 验证头
    data = checkHead(data)

    // 数据长度
    const len = data.readUInt16BE(7)

    // 数据
    const res = Buffer.alloc(len)
    data.copy(res, 0, 9, len + 9)
    console.log('接收的数据：', res)

    // 验证crc数据
    const ccrc = Buffer.alloc(len + 8)
    data.copy(ccrc, 0, 1, len + 9)
    const crc = crc16Modbus(ccrc, ccrc.length)
    const dcrc = Buffer.alloc(2)
    data.copy(dcrc, 0, len + 9)
    // crc验证失败
    if (crc.compare(dcrc) < 0) {
      return
    }
    // 空数据
    if (len == 0) return
    // 命令
    const cmd = data.readUint8(5)
    console.log('cmd: ', cmd)

    const response = await this.saveData(cmd, res); // Asegúrate de que saveData es async y retorna algo adecuado
    this.sendTcpData(response, cmd, socket);
  }
/**
 * @description: Guardar datos según el comando recibido
 * @param {*} cmd Comando que determina el tipo de datos
 * @param {*} data Datos recibidos del TCP
 * @return {Promise}
 */
async saveData(cmd, data) {
  const dataArr = data.toString().split(',');
  try {
      switch (cmd) {
          case 0xd1:
              console.log('heart: ', dataArr);
              await saveHeartbeatDataBase({
                  // Suponiendo que estos métodos aceptan objetos directamente
                  sn: dataArr[0],
                  timeStamp: parseDateMongoDB(dataArr[1]),
                  receivingPower: parseInt(dataArr[2]),
                  transmissionPower: parseInt(dataArr[3]),
                  codeStatus: dataArr[4],
                  version: dataArr[6],
                  model: dataArr[7]
              });
              
              break;
          case 0xd2:
              console.log('data: ', dataArr);
               await saveCountDataBase({
                  sn: dataArr[0],
                  timeStamp: parseDateMongoDB(dataArr[1]),
                  inCount: parseInt(dataArr[2]),
                  outCount: parseInt(dataArr[3]),
                  receivingPower: parseInt(dataArr[4]),
                  transmissionPower: parseInt(dataArr[5]),
                  codeStatus: dataArr[6],
                  version: dataArr[7],
                  model: dataArr[8]
              });
              break;
      }
  } catch (error) {
      console.error('Error saving data:', error);
  }
  return this.recoveryData();
}

  /**
   * @description: 发送tcp数据
   * @param {*} data 发送的数据
   * @param {*} cmd 命令
   * @param {*} socket
   */
  sendTcpData = (data, cmd, socket) => {
    // 头部
    const head = bufferFromArray(HEAD)
    // 固定id
    const deviceId = bufferFromArray(DEVICEID)
    // 命令
    const sendCmd = bufferFromArray([cmd, PARAM])
    // 数据
    let dataBuffer = Buffer.from(data)
    console.log('send-data: ', data)
    // 数据长度
    let len = Buffer.alloc(2)
    len.writeInt16BE(dataBuffer.length)
    // 添加数据长度
    dataBuffer = Buffer.concat([len, dataBuffer])
    // 进行crc校验的数据
    const msg = Buffer.concat(
      [deviceId, sendCmd, dataBuffer],
      dataBuffer.length + deviceId.length
    )
    const crc = crc16Modbus(msg, msg.length)
    // 转义
    const escapeData = sendDataEscape(Buffer.concat([msg, crc]))

    const dataEnd = bufferFromArray(END)
    // 发送的数据
    const sendDatas = Buffer.concat([head, escapeData, dataEnd])
    console.log('send-data-buffer:', sendDatas)
    socket.write(sendDatas)
  }
  /**
   * @description: 回复
   * @return {Buffer}
   */
  recoveryData() {
    // 回复数据格式--Reply Data Format
    // [状态码,时间戳,营业开始时间,营业结束时间,上传间隔,记录周期,统计方向,升级标志,升级链接, 预留]
    // [Status code, timestamp, business start time, business end time, upload interval, recording cycle, statistical direction, upgrade flag, upgrade link, reservation]
    // 状态码: 0-成功, 1-失败 --- Status code: 0- Success, 1- Failure
    return [
      0,
      formatDate(),
      ...getBusinessHours(),
      ...getCycle(this.record),
      getDirection(),
      0,
      0,
      0,
    ].join(',')
  }

  // 连接
  handleConnect(socket) {
    this._count++
    // zh
    // console.log(
    //   `客户端IP:${socket.remoteAddress}连接到服务器, 当前连接数量: ${this._count}`
    // )
    // en
    console.log(
      `Client IP: ${socket.remoteAddress} connected to server, current number of connections: ${this._count}`
    )
    socket.on('data', buffer => this.handleData(buffer, socket))
    // socket.on('end', this.handleDisconnect.bind(this))
    socket.on('error', err => {
      console.log(err)
    })
    socket.on('close', this.handleDisconnect.bind(this))
  }
  // 断开连接
  handleDisconnect() {
    this._count--
    // zh
    // console.log(`有一客户端断开连接, 当前连接数量: ${this._count}`)
    // en
    console.log(
      `One client disconnected, current number of connections: ${this._count}`
    )
  }
  // 关闭
  handleClose() {
    this._count = 0
    console.log('Server Close!')
  }
  // 监听错误
  handleError(err) {
    if (err.code === 'EADDRINUSE') {
      // zh
      // console.log('地址正被使用，重试中...')
      // en
      console.log('The address is currently in use, retry in progress')
      setTimeout(() => {
        server?.close()
        server.listen(this.port, this.host)
      }, 1000)
    } else {
      // zh
      // console.error('服务器异常：', err)
      // en
      console.error('Server exception: ', err)
    }
  }
}

module.exports = {
  IRTCP,
}
