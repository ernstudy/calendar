import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import RecentEvents from "./RecentEvents/RecentEvents";
import { EventMenuProvider } from "../../context/EventMenuContext";
import HomeCalendar from "./HomeCalendar/HomeCalendar";

export default function index() {
  return (
    <Container maxWidth="lg" className="home-container">
      <HomeCalendar />

      <EventMenuProvider>
        <RecentEvents />
      </EventMenuProvider>
    </Container>
  );
}
