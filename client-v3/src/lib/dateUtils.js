// dateUtils.js

export const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6 ? 1 : 0;
  };
  
  export const getDayOfWeek = (date) => {
    return date.getDay();
  };
  
  export const isStartOfMonth = (date) => {
    return date.getDate() === 1 ? 1 : 0;
  };
  
  export const isHoliday = (date) => {
    const holidays = ['2024-01-01', '2024-12-25', '2024-05-11']; // Lista de feriados
    const dateString = date.toISOString().split('T')[0];
    return holidays.includes(dateString) ? 1 : 0;
  };
  