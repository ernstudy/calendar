import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventProvider } from "./context/EventContext";

// Conponents
import Navigation from "./components/Navigation/Navigation";

// Pages
import HomePage from "./HomePage/";
import EventListPage from "./EventListPage/";
import CalendarPage from "./CalendarPage/";
import FavoritePage from "./FavoritePage/";
import TrashPage from "./TrashPage/index";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import { ThemeProvider } from "./context/Theme";

export default function App() {
  //
  return (
    <EventProvider>
      <div>
        <Router>
          <div className="container-all">
            <ThemeProvider>
              <div className="navegation-container">
                <Navigation />
              </div>

              <div className="bottom-navigation">
                <BottomNavigation />
              </div>
            </ThemeProvider>

            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/event-list" element={<EventListPage />} />
              <Route path="/calendar" element={<CalendarPage />}></Route>
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/trash" element={<TrashPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </EventProvider>
  );
}
