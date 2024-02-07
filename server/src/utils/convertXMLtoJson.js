const xml2js = require('xml2js');

// Función para convertir XML a JSON
exports.convertXmlToJson = function (xmlData) {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
