import React, { useEffect, useState } from "react";
import styles from "./RecentEvents.module.css";
import { Add } from "@mui/icons-material";
import { useEventContext } from "../../context/EventContext";
import Event from "../../components/EventComponent/Event";

export default function RecentEvents() {
  const { events, eventModalToggle, setEventForDayId } = useEventContext();

  const [isEventId, setIsEventId] = useState(null);

  const recentsEvents = events.slice(0, 7);

  const eventClickedToggle = (id) => {
    isEventId != null ? setIsEventId(null) : setIsEventId(id);
  };

  const addEvent = () => {
    // getEventDate("");
    eventModalToggle();
    //
    setEventForDayId("");
    document.body.style.overflow = "hidden";
  };

  // ***** NO EVENT YET ******
  // if the event list is empty, display this
  const isNoEvent = () => {
    if (events.length == 0) {
      return (
        <span className={styles.noEvent}>
          <h4>No event yet</h4>
        </span>
      );
    }
  };

  const noEventYet = isNoEvent();

  return (
    <div className={styles.container}>
      <div className={styles.addEvent} onClick={addEvent}>
        <div className={styles.addEvent__input}>Add event</div>
        <div className={styles.addEvent__button}>
          <Add className={styles.addEvent__icon} />
        </div>
      </div>

      <div className={styles.recentEvent}>
        <div className={styles.heading}>
          <h3>Recent events</h3>
        </div>
        {/* no event yet  */}
        {noEventYet}

        <div className={styles.list}>
          {recentsEvents.map((event) => (
            <div key={event.id} onClick={() => eventClickedToggle(event.id)}>
              <Event event={event} isEventId={isEventId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
