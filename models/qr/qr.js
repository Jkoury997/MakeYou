const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
    const QRCode = sequelize.define('qr', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
      },
      nameQr: DataTypes.STRING,
      typeQr: DataTypes.STRING,
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      nameDireccion: DataTypes.STRING,
      urlDireccion: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      urlWhatsapp: DataTypes.STRING,
      business: DataTypes.STRING,
      puesto: DataTypes.STRING,

       // Campos para WiFi:
       ssid: DataTypes.STRING,             // Nombre de la red WiFi
       networkType: DataTypes.STRING,     // Tipo de red: WPA, WEP, Ninguno
       password: DataTypes.STRING,        // Contraseña de la red
       hiddenSSID: DataTypes.BOOLEAN      // Si la red es oculta o no
      

    });
  
    return QRCode;
  };

