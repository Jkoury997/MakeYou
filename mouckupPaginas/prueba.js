function generateDateRanges(dateTo) {
    const ranges = [];
    let currentDate = new Date(dateTo);

    for (let i = 0; i < 12; i++) {
        // Obtener el último día del mes actual
        let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        // Obtener el primer día del mes actual
        let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        ranges.push({
            dateFrom: firstDayOfMonth.toISOString().split('T')[0],  // Convertir a formato YYYY-MM-DD
            dateTo: lastDayOfMonth.toISOString().split('T')[0]
        });

        // Cambiar a último día del mes anterior para la siguiente iteración
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    }

    return ranges;
}


console.log(generateDateRanges("2023-09-29"));