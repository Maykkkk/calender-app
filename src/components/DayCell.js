import React from "react";

export const DayCell = ({ day, isSelected, onClick }) => {
  const isToday = new Date().toDateString() === day.date.toDateString();

  return (
    <div
      className={`day-cell ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {day.date.getDate()}
    </div>
  );
};
