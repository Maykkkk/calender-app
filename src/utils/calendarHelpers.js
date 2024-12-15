/**
 * Generate days of the calendar month in a 2D array (rows of 7 for weeks).
 */
export const renderCalendarDays = (currentMonth) => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
  
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const firstDayWeekIndex = firstDayOfMonth.getDay(); // Index of the first visible day in the week
    const calendarDays = [];
    
    // Add blanks before the first day of the month for alignment
    let week = new Array(firstDayWeekIndex).fill(null);
  
    // Generate calendar days
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      week.push({ date, isToday: date.toDateString() === new Date().toDateString() });
  
      // If the week is filled, push it to calendarDays and reset for the next week
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
    }
  
    // Fill the remaining cells in the last week (to make it exactly 7 columns)
    if (week.length > 0) {
      week = week.concat(new Array(7 - week.length).fill(null));
      calendarDays.push(week);
    }
  
    return calendarDays; // 2D array with weeks as rows
  };
  