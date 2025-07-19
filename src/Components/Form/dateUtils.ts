export const months = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getDaysInMonth = (month: number, year: number): number => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (month === 1 && isLeapYear(year)) { // February in leap year
    return 29;
  }
  
  return daysInMonth[month];
};

export const getDaysInMonthForYear = (year: number): number[] => {
  return months.map((_, index) => getDaysInMonth(index, year));
};

export const getMaxDaysInAnyMonth = (): number => {
  return 31;
};

export const formatDateKey = (monthIdx: number, dayIdx: number, year: number): string => {
  return `${year}-${monthIdx}-${dayIdx}`;
};

export const formatDateDisplay = (monthIdx: number, dayIdx: number, year: number): string => {
  const monthName = months[monthIdx].charAt(0) + months[monthIdx].slice(1).toLowerCase();
  return `${monthName} ${dayIdx + 1}, ${year}`;
}; 