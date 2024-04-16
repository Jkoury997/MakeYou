async function formatDate(data) {
    // Convertir la fecha de cadena a objeto Date
    const timeStamp = new Date(
      parseInt(data[1].substring(0, 4)),       // Año
      parseInt(data[1].substring(4, 6)) - 1,   // Mes (0-indexado)
      parseInt(data[1].substring(6, 8)),       // Día
      parseInt(data[1].substring(8, 10)),      // Hora
      parseInt(data[1].substring(10, 12)),     // Minutos
      parseInt(data[1].substring(12, 14))      // Segundos
    );
    return timeStamp
}

module.exports = formatDate