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

    });
  
    return QRCode;
  };

