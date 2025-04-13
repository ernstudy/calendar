import React, { useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import "./App.css";

// Conponents
import HomePage from "./components/HomePage/";
import EventListPage from "./components/CalendarPage/";
import CalendarPage from "./components/EventListPage/";
import FavoritePage from "./components/FavoritePage/";
import TrashtPage from "./components/TrashPage/";

export default function App() {
  useEffect(() => {
    document.documentElement.className = "light-mode";
  });
  return (
    <EventProvider>
      <div>
        <Router>
          <div className="container-all">
            <Navigation />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/event-list" element={<EventListPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/trash" element={<TrashtPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </EventProvider>
  );
}
