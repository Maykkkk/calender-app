import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import { loadEvents } from "./services/EventManager";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const data = loadEvents();
    console.log("Events loaded:", data); 
  }, []);

  const handleDaySelect = (date) => {
    setSelectedDate(new Date(date));
  };

  return (
    <div
      className="App min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2021/09/23/06/23/notepad-6648710_1280.png')", // Replace with your desired image URL
      }}
    >
      <div className=" bg-opacity-50 min-h-screen py-12 px-4">
      <h1 className="text-5xl text-center text-indigo-900 font-extrabold mb-10 tracking-wide shadow-lg">
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
