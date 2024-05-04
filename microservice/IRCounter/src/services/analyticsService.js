const CountData = require('../database/models/CountData');
const statisticsUtil = require('../utils/statisticsUtil');

function getEndOfDay(dateString) {
    const date = new Date(dateString + "T00:00:00.000Z");
    date.setUTCHours(23, 59, 59, 999);
    return date;
}

function generateDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1); // Incrementa la fecha en un día
    }

    return dates;
}
    

exports.calculateStatistics = async (idStore, startDate, endDate) => {
    const query = {
        idStore: idStore
    };

    // Agregar rango de fechas al filtro si ambas fechas están presentes
    if (startDate && endDate) {
        query.timeStamp = {
            $gte: new Date(startDate),
            $lte: getEndOfDay(endDate)
        };
    }

    const entries = await CountData.find(query).select('inCount outCount -_id'); // Incluir outCount en la selección

    // Mapear los datos recibidos para calcular estadísticas
    const inCounts = entries.map(entry => entry.inCount);
    const outCounts = entries.map(entry => entry.outCount);

    // Calcular estadísticas para inCount y sumar inCounts y outCounts
    const stats = statisticsUtil.calculateStats(inCounts);
    const totalIn = inCounts.reduce((acc, val) => acc + val, 0);
    const totalOut = outCounts.reduce((acc, val) => acc + val, 0);

    // Agregar totales al objeto de estadísticas
    return {
        ...stats,
        totalIn,
        totalOut
    };
};


exports.getTimeStatisticsDate = async (idStore, startDate, endDate) => {
    const query = { idStore };

    if (startDate && endDate) {
        query.timeStamp = {
            $gte: new Date(startDate),
            $lte: getEndOfDay(endDate)
        };
    }

    const aggregationResult = await CountData.aggregate([
        {
            $match: query
        },
        {
            $project: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
                inCount: 1,
                outCount: 1
            }
        },
        {
            $group: {
                _id: "$date",
                totalIn: { $sum: "$inCount" },
                totalOut: { $sum: "$outCount" }
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ]);

    // Crear un rango de fechas completo
    const dateRange = generateDateRange(startDate, endDate);

    // Convertir los resultados en un mapa para un acceso más rápido
    const resultMap = {};
    aggregationResult.forEach(item => {
        resultMap[item._id] = {
            totalIn: item.totalIn,
            totalOut: item.totalOut
        };
    });

    // Rellenar los resultados con las fechas faltantes
    const filledResults = dateRange.map(date => {
        const data = resultMap[date];
        return {
            date,
            totalIn: data ? data.totalIn : 0,
            totalOut: data ? data.totalOut : 0
        };
    });

    return filledResults;
};





exports.getTimeStatisticsDay = async (idStore, startDate, endDate) => {
    // Definir el query básico para filtrar por tienda y rango de fechas
    const query = {
        idStore: idStore,
        timeStamp: {
            $gte: new Date(startDate + "T00:00:00.000Z"),  // Asegurarse de que empiece al inicio del día en UTC
            $lte: getEndOfDay(endDate)  // Asegurarse de que termine al final del día en UTC
        }
    };

    // Agregación para contar entradas y salidas por día de la semana y contar los días específicos
    const result = await CountData.aggregate([
        {
            $match: query
        },
        {
            $project: {
                dayOfWeek: { $dayOfWeek: "$timeStamp" },
                dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
                inCount: 1,
                outCount: 1
            }
        },
        {
            $group: {
                _id: "$dateOnly",
                dayOfWeek: { $first: "$dayOfWeek" },
                totalInCount: { $sum: "$inCount" },
                totalOutCount: { $sum: "$outCount" }
            }
        },
        {
            $group: {
                _id: "$dayOfWeek",
                totalInCount: { $sum: "$totalInCount" },
                totalOutCount: { $sum: "$totalOutCount" },
                countDays: { $sum: 1 }
            }
        },
        {
            $project: {
                totalInCount: 1,
                totalOutCount: 1,
                countDays: 1,
                averageInCount: { $divide: ["$totalInCount", "$countDays"] },  // Calcular el promedio de inCount por día
                averageOutCount: { $divide: ["$totalOutCount", "$countDays"] }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    // Ajustar los nombres de los días de la semana en los resultados
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const adjustedResults = result.map(item => ({
        dayOfWeek: daysOfWeek[item._id - 1],
        totalInCount: item.totalInCount,
        totalOutCount: item.totalOutCount,
        countDays: item.countDays,
        averageInCount: item.averageInCount,  // Añadir el promedio al resultado
        averageOutCount: item.averageOutCount 
    }));

    return adjustedResults;
};



