import { Container } from "@mui/material";
import React, { useState } from "react";
import styles from "./EventListPage.module.css";
import Event from "../components/EventComponent/Event";
import { useEventContext } from "../context/EventContext";
import EventModal from "../components/EventModal/EventModal";

export default function index() {
  //
  const { events } = useEventContext();
  //

  const [isEventId, setIsEventId] = useState(null);
  const handleEvent = (id) => {
    setIsEventId((prev) => (prev == null ? id : null));
  };
  return (
    <Container maxWidth="lg">
      <div className={styles.heading}>
        <h2>Event list</h2>
      </div>
      <div className={styles.list}>
        {events.map((event) => (
          <div
            onClick={() => handleEvent(event.id)}
            key={event.id}
            className={styles.tile}
          >
            <Event event={event} isEventId={isEventId} />
          </div>
        ))}
      </div>

      <EventModal />
    </Container>
  );
}
