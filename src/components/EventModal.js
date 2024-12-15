import React, { useState, useEffect } from "react";
import {
  addEvent,
  deleteEvent,
  editEvent,
  getEventsForDate,
} from "../services/EventManager";

export const EventModal = ({ date, closeModal }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    const loadedEvents = getEventsForDate(date);
    setEvents(loadedEvents);
  }, [date]);

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.startTime || !newEvent.endTime) {
      alert("Event name and times are required.");
      return;
    }

    addEvent(date, newEvent);
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
    const updatedEvents = getEventsForDate(date);
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (index) => {
    deleteEvent(date, index);
    const updatedEvents = getEventsForDate(date);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    const updatedName = prompt("Edit event name:", events[index].name);
    const updatedStartTime = prompt(
      "Edit start time:",
      events[index].startTime
    );
    const updatedEndTime = prompt(
      "Edit end time:",
      events[index].endTime
    );
    const updatedDescription = prompt(
      "Edit description:",
      events[index].description
    );

    if (
      updatedName &&
      updatedStartTime &&
      updatedEndTime
    ) {
      const updatedEvent = {
        name: updatedName,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
        description: updatedDescription,
      };
      editEvent(date, index, updatedEvent);
      const updatedEvents = getEventsForDate(date);
      setEvents(updatedEvents);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Events for {date.toDateString()}
        </h3>
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {events.map((event, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-700"
              >
                <span>
                  {event.name} | {event.startTime} - {event.endTime}{" "}
                  {event.description && `| ${event.description}`}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditEvent(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Add Event</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <input
                type="time"
                placeholder="Start Time"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                placeholder="End Time"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddEvent}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Event
            </button>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="mt-6 w-full py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};
