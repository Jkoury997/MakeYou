exports.calculateStats = (data) => {
    const sum = data.reduce((acc, val) => acc + val, 0);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const avg = sum / data.length;
    const variance = data.reduce((acc, val) => acc + (val - avg) ** 2, 0) / data.length;
    const stdDev = Math.sqrt(variance);

    return { avg, min, max, stdDev };
};


exports.formatTimeData = (data) => {
    return data.map(item => ({
        date: `${item._id.day}/${item._id.month}/${item._id.year}`,
        totalIn: item.totalIn,
        totalOut: item.totalOut
    }));
};

exports.formatDayOfWeekData = (data) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return data.map(item => ({
        dayOfWeek: days[item._id - 1],
        averageIn: parseFloat(item.averageIn.toFixed(2)),
        averageOut: parseFloat(item.averageOut.toFixed(2))
    }));
};