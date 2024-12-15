import React, { useState, useEffect } from "react";
import { renderCalendarDays } from "../utils/calendarHelpers";
import { DayCell } from "./DayCell";
import { EventModal } from "./EventModal";
import { DndContext } from "@dnd-kit/core";

const CalendarView = ({ selectedDate, onSelectDay }) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) =>
      new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const draggedEvent = events.find((e) => e.id === active.id);
    const updatedEvents = events.map((e) =>
      e.id === draggedEvent.id
        ? { ...e, date: new Date(over.id) }
        : e
    );

    setEvents(updatedEvents);
  };

  const weeks = renderCalendarDays(currentMonth);

  const openModal = (date) => {
    onSelectDay(date);
    setSelectedDateForModal(date);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDateForModal(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="calendar-container max-w-3xl mx-auto p-4">
        {/* Controls */}
        <div className="controls flex justify-between items-center mb-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="text-xl font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid grid grid-cols-7 gap-2">
          {weeks.map((week, index) => (
            <div className="week-row flex justify-between" key={index}>
              {week.map((day, idx) =>
                day ? (
                  <DayCell
                    key={idx}
                    day={day}
                    isSelected={day?.date?.toDateString() === selectedDate.toDateString()}
                    onClick={() => openModal(day.date)}
                    className="w-12 h-12 text-center cursor-pointer rounded-md hover:bg-gray-200"
                  />
                ) : (
                  <div className="day-cell empty w-12 h-12" key={idx}></div>
                )
              )}
            </div>
          ))}
        </div>

        {/* Event Modal */}
        {modalVisible && selectedDateForModal && (
          <EventModal date={selectedDateForModal} closeModal={closeModal} />
        )}
      </div>
    </DndContext>
  );
};

export default CalendarView;
