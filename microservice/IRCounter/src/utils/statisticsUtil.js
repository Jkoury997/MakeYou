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

exports.generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1); // Incrementa la fecha en un día
    }

    return dates;
}