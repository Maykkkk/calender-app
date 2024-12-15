// EventManager.js
const EVENTS_STORAGE_KEY = "calendar_events";

/**
 * Load all events from localStorage.
 */
export const loadEvents = () => {
  const events = localStorage.getItem(EVENTS_STORAGE_KEY);
  return events ? JSON.parse(events) : {};
};

/**
 * Save events back to localStorage.
 */
export const saveEvents = (events) => {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};

/**
 * Add or edit an event for a specific date.
 */
export const addEvent = (date, event) => {
  const events = loadEvents();
  const dateString = date.toISOString().split("T")[0];
  if (!events[dateString]) {
    events[dateString] = [];
  }
  events[dateString].push(event);
  saveEvents(events);
};

/**
 * Delete an event by index for a specific date.
 */
export const deleteEvent = (date, index) => {
  const events = loadEvents();
  const dateString = date.toISOString().split("T")[0];
  if (events[dateString]) {
    events[dateString].splice(index, 1);
    saveEvents(events);
  }
};

/**
 * Edit an event on a specific date by index.
 */
export const editEvent = (date, index, updatedEvent) => {
  const events = loadEvents();
  const dateString = date.toISOString().split("T")[0];
  if (events[dateString]) {
    events[dateString][index] = updatedEvent;
    saveEvents(events);
  }
};

/**
 * Get events for a specific date.
 */
export const getEventsForDate = (date) => {
  const events = loadEvents();
  const dateString = date.toISOString().split("T")[0];
  return events[dateString] || [];
};
