import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import { loadEvents } from "./services/EventManager";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const data = loadEvents();
    console.log("Events loaded:", data); // For debugging or future use
  }, []);

  const handleDaySelect = (date) => {
    setSelectedDate(new Date(date));
  };

  return (
    <div
      className="App min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://your-background-image-url.com')", // Replace with your desired image URL
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen py-12 px-4">
        <h1 className="text-4xl text-center text-white font-bold mb-8">
          Dynamic Event Calendar
        </h1>
        <div className="max-w-4xl mx-auto">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDay={handleDaySelect}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
