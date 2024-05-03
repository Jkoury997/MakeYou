const CountData = require('../database/models/CountData');
const statisticsUtil = require('../utils/statisticsUtil');

exports.calculateStatistics = async (idStore, startDate, endDate) => {
    const query = {
        idStore: idStore
    };

    // Agregar rango de fechas al filtro si ambas fechas están presentes
    if (startDate && endDate) {
        query.timeStamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    const entries = await CountData.find(query).select('inCount -_id');
    return statisticsUtil.calculateStats(entries.map(entry => entry.inCount));
};


exports.getTimeStatisticsDate = async (idStore, startDate, endDate) => {
    const query = { idStore };

    if (startDate && endDate) {
        query.timeStamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    const result = await CountData.aggregate([
        {
            $match: query
        },
        {
            $project: {
                day: { $dayOfMonth: "$timeStamp" },
                month: { $month: "$timeStamp" },
                year: { $year: "$timeStamp" },
                inCount: 1,
                outCount: 1
            }
        },
        {
            $group: {
                _id: { day: "$day", month: "$month", year: "$year" },
                totalIn: { $sum: "$inCount" },
                totalOut: { $sum: "$outCount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
        }
    ]);

    return statisticsUtil.formatTimeData(result);
};
exports.getTimeStatisticsDay = async (idStore, startDate, endDate) => {
    // Convertir endDate para incluir todo el día, asegurándose de que la hora esté ajustada correctamente
    let endDateModified = new Date(endDate);
    endDateModified.setDate(endDateModified.getDate() + 1);  // Establecer al final del día para incluir todas las actividades de ese día

    // Definir el query básico para filtrar por tienda y rango de fechas
    const query = {
        idStore: idStore,
        timeStamp: {
            $gte: new Date(startDate + 'T00:00:00.000Z'),  // Asegurarse de que empiece al inicio del día
            $lte: endDateModified
        }
    };

    // Agregación para contar entradas y salidas por día de la semana y contar los días específicos
    const result = await CountData.aggregate([
        {
            $match: query
        },
        {
            $project: {
                dayOfWeek: { $dayOfWeek: "$timeStamp" },  // Extraer el día de la semana
                dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },  // Convertir timestamp a solo fecha
                inCount: 1,  // Proyectar el campo inCount
                outCount: 1  // Proyectar el campo outCount
            }
        },
        {
            $group: {
                _id: "$dateOnly",  // Agrupar por la fecha sin considerar la hora
                dayOfWeek: { $first: "$dayOfWeek" },  // Tomar el día de la semana de la primera entrada
                totalInCount: { $sum: "$inCount" },  // Sumar inCount para cada día
                totalOutCount: { $sum: "$outCount" }  // Sumar outCount para cada día
            }
        },
        {
            $group: {
                _id: "$dayOfWeek",  // Reagrupar por día de la semana
                totalInCount: { $sum: "$totalInCount" },
                totalOutCount: { $sum: "$totalOutCount" },
                countDays: { $sum: 1 }  // Contar cuántos días únicos hay para cada día de la semana
            }
        },
        {
            $sort: { _id: 1 }  // Ordenar por día de la semana
        }
    ]);

    // Ajustar los nombres de los días de la semana en los resultados
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const adjustedResults = result.map(item => ({
        dayOfWeek: daysOfWeek[item._id - 1],
        totalInCount: item.totalInCount,
        totalOutCount: item.totalOutCount,
        countDays: item.countDays  // Mostrar cuántos días concretos hay para cada día de la semana
    }));

    return adjustedResults;
};


