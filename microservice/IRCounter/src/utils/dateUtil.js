// utils/dateUtils.js

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

function isHoliday(date) {
    const holidays = [
        "2024-01-01", "2024-02-12", "2024-02-13", "2024-03-24",
        "2024-03-29", "2024-04-02", "2024-05-01", "2024-05-25",
        "2024-06-20", "2024-07-09", "2024-08-17", "2024-10-12",
        "2024-11-20", "2024-12-08", "2024-12-25"
    ];
    const formattedDate = date.toISOString().split('T')[0];
    return holidays.includes(formattedDate) ? 1 : 0;
}

module.exports = {
    getEndOfDay,
    generateDateRange,
    isHoliday
};
