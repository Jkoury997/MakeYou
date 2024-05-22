const CountData = require('../database/models/CountData');
const statisticsUtil = require('../utils/statisticsUtil');
const { isHoliday, generateDateRange, getEndOfDay } = require('../utils/dateUtil'); 



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



exports.prepareDataHours = async (idStore, startDate, endDate) => {
    const query = {
        idStore,
        timeStamp: {
            $gte: new Date(startDate + "T00:00:00.000Z"),
            $lte: getEndOfDay(endDate)
        }
    };

    const entries = await CountData.find(query).select('timeStamp inCount outCount -_id');

    const start = new Date(startDate + "T00:00:00.000Z");
    const end = getEndOfDay(endDate);

    const hours = [];
    for (let date = new Date(start); date <= end; date.setHours(date.getHours() + 1)) {
        hours.push(new Date(date));
    }

    const groupedData = {};
    entries.forEach(entry => {
        const hourKey = entry.timeStamp.toISOString().slice(0, 13);
        if (!groupedData[hourKey]) {
            groupedData[hourKey] = { inCount: 0, outCount: 0, timeStamp: new Date(hourKey + ":00:00.000Z") };
        }
        groupedData[hourKey].inCount += entry.inCount;
        groupedData[hourKey].outCount += entry.outCount;
    });

    const preparedData = hours.map(date => {
        const hourKey = date.toISOString().slice(0, 13);
        const data = groupedData[hourKey] || { inCount: 0, outCount: 0, timeStamp: date };

        return {
            date: data.timeStamp,
            hour: data.timeStamp.getUTCHours(),
            inCount: data.inCount,
            outCount: data.outCount,
            isWeekend: data.timeStamp.getUTCDay() === 0 || data.timeStamp.getUTCDay() === 6 ? 1 : 0,
            isWeekday: isWeekday(data.timeStamp) ? 1 : 0,
            isStartOfMonth: data.timeStamp.getUTCDate() === 1 ? 1 : 0,
            isEndOfMonth: isEndOfMonth(data.timeStamp) ? 1 : 0,
            normalizedInCount: data.inCount / (data.inCount + data.outCount || 1),
            dayOfWeek: data.timeStamp.getUTCDay(),
            weekOfYear: getWeekNumber(data.timeStamp),
            quarter: getQuarter(data.timeStamp),
            isHoliday: isHoliday(data.timeStamp),
            month: data.timeStamp.getUTCMonth() + 1,
        };
    });

    return preparedData;
};

exports.prepareDataDay = async (idStore, startDate, endDate) => {
    const query = {
        idStore,
        timeStamp: {
            $gte: new Date(startDate + "T00:00:00.000Z"),
            $lte: getEndOfDay(endDate)
        }
    };

    const entries = await CountData.find(query).select('timeStamp inCount outCount -_id');

    const groupedByDate = entries.reduce((acc, entry) => {
        const dateOnly = entry.timeStamp.toISOString().split('T')[0];
        if (!acc[dateOnly]) {
            acc[dateOnly] = {
                date: new Date(dateOnly),
                inCount: 0,
                outCount: 0
            };
        }
        acc[dateOnly].inCount += entry.inCount;
        acc[dateOnly].outCount += entry.outCount;
        return acc;
    }, {});

    const preparedData = Object.values(groupedByDate).map(data => ({
        date: data.date,
        inCount: data.inCount,
        outCount: data.outCount,
        isWeekend: data.date.getDay() === 0 || data.date.getDay() === 6 ? 1 : 0,
        isStartOfMonth: data.date.getDate() === 1 ? 1 : 0,
        normalizedInCount: data.inCount / (data.inCount + data.outCount || 1), // Evitar división por cero
        dayOfWeek: data.date.getDay(),
        isHoliday: isHoliday(data.date),
        month: data.date.getMonth() + 1,
    }));

    return preparedData;
};

exports.prepareData = async (idStore, startDate, endDate) => {
    const query = {
        idStore,
        timeStamp: {
            $gte: new Date(startDate + "T00:00:00.000Z"),
            $lte: getEndOfDay(endDate)
        }
    };

    const entries = await CountData.find(query).select('timeStamp inCount outCount -_id');

    const preparedData = entries.map(entry => ({
        date: entry.timeStamp,
        inCount: entry.inCount,
        outCount: entry.outCount,
        isWeekend: entry.timeStamp.getDay() === 0 || entry.timeStamp.getDay() === 6 ? 1 : 0,
        isStartOfMonth: entry.timeStamp.getDate() === 1 ? 1 : 0,
        normalizedInCount: entry.inCount / (entry.inCount + entry.outCount || 1), // Evitar división por cero
        dayOfWeek: entry.timeStamp.getDay(),
        isHoliday: isHoliday(entry.timeStamp),
        month: entry.timeStamp.getMonth() + 1,
    }));

    return preparedData;
};

  
exports.prepareDataWeek = async (idStore, startDate, endDate) => {
    const query = {
      idStore,
      timeStamp: {
        $gte: new Date(startDate + "T00:00:00.000Z"),
        $lte: getEndOfDay(endDate)
      }
    };
  
    const entries = await CountData.find(query).select('timeStamp inCount outCount -_id');
  
    const preparedData = entries.map(entry => ({
      date: entry.timeStamp,
      inCount: entry.inCount,
      outCount: entry.outCount,
      isWeekend: entry.timeStamp.getDay() === 0 || entry.timeStamp.getDay() === 6 ? 1 : 0,
      isStartOfMonth: entry.timeStamp.getDate() === 1 ? 1 : 0,
      normalizedInCount: entry.inCount / (entry.inCount + entry.outCount || 1),
      dayOfWeek: entry.timeStamp.getDay(),
      isHoliday: isHoliday(entry.timeStamp),
      month: entry.timeStamp.getMonth() + 1,
    }));
  
    const groupedData = groupByWeek(preparedData);
    return formatGroupedData(groupedData);
  };

  exports.prepareDataRange = (startDate, endDate) => {
    const start = new Date(startDate + "T00:00:00.000Z");
    const end = getEndOfDay(endDate);

    const hours = [];
    for (let date = new Date(start); date <= end; date.setHours(date.getHours() + 1)) {
        hours.push(new Date(date));
    }

    const preparedData = hours.map(date => ({
        date: date.toISOString(),
        hour: date.getUTCHours(),
        isWeekend: date.getUTCDay() === 0 || date.getUTCDay() === 6 ? 1 : 0,
        isWeekday: isWeekday(date) ? 1 : 0,
        isStartOfMonth: date.getUTCDate() === 1 ? 1 : 0,
        isEndOfMonth: isEndOfMonth(date) ? 1 : 0,
        normalizedInCount: 0.5, // Este valor debe ser calculado basado en otros datos, aquí lo inicializamos en 0.5
        dayOfWeek: date.getUTCDay(),
        weekOfYear: getWeekNumber(date),
        quarter: getQuarter(date),
        isHoliday: isHoliday(date),
        month: date.getUTCMonth() + 1,
    }));

    console.log(preparedData);
    return preparedData;
};

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const groupByWeek = (data) => {
    return data.reduce((acc, entry) => {
      const week = getWeekNumber(entry.date);
      const year = entry.date.getFullYear();
      const weekKey = `${year}-W${week}`;
  
      if (!acc[weekKey]) {
        acc[weekKey] = {
          week: weekKey,
          inCount: 0,
          outCount: 0,
          dates: [],
        };
      }
  
      acc[weekKey].inCount += entry.inCount;
      acc[weekKey].outCount += entry.outCount;
      acc[weekKey].dates.push(entry.date);
  
      return acc;
    }, {});
  };
  
  const formatGroupedData = (groupedData) => {
    return Object.values(groupedData).map((weekData) => {
      const firstDate = weekData.dates[0];
      return {
        date: firstDate,
        inCount: weekData.inCount,
        outCount: weekData.outCount,
        isWeekend: firstDate.getDay() === 0 || firstDate.getDay() === 6 ? 1 : 0,
        isStartOfMonth: firstDate.getDate() === 1 ? 1 : 0,
        normalizedInCount: weekData.inCount / (weekData.inCount + weekData.outCount || 1),
        dayOfWeek: firstDate.getDay(),
        isHoliday: isHoliday(firstDate),
        month: firstDate.getMonth() + 1,
        week: weekData.week,
      };
    });
  };

  const getQuarter = (date) => Math.floor((date.getUTCMonth() + 3) / 3);

  const isWeekday = (date) => date.getUTCDay() >= 1 && date.getUTCDay() <= 5;
const isEndOfMonth = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getUTCDate() + 1);
    return nextDay.getUTCDate() === 1;
};
