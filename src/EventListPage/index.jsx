import { Container } from "@mui/material";
import React, { useState } from "react";
import styles from "./EventListPage.module.css";
import Event from "../components/EventComponent/Event";
import { useEventContext } from "../context/EventContext";
import EventModal from "../components/EventModal/EventModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function index() {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //
  const { events } = useEventContext();
  //

  const [isEventId, setIsEventId] = useState(null);
  const handleEvent = (id) => {
    setIsEventId((prev) => (prev == null ? id : null));
  };

  const noEvent = () => {
    if (events.length == 0) {
      return <h3>No event yet</h3>;
    }
  };

  const noEventYet = noEvent();
  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>Event list</h2>
        </div>
        <div ref={parent} className={styles.list}>
          <div className={styles.noEvent}> {noEventYet}</div>
          {events.map((event) => (
            <div
              onClick={() => handleEvent(event.id)}
              key={event.id}
              className={styles.box}
            >
              <Event event={event} isEventId={isEventId} />
            </div>
          ))}
        </div>

        <EventModal />
      </div>
    </Container>
  );
}
