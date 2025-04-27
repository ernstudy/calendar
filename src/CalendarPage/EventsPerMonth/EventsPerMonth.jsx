import React, { useState } from "react";
import { useEventContext } from "../../context/EventContext";
import Event from "../../components/EventComponent/Event";
import styles from "./EventsPerMonth.module.css";
export default function EventsPerMonth() {
  const { globalDate, events } = useEventContext();

  const { year, month } = globalDate();

  const [isEventId, setIsEventId] = useState(null);
  const handleEvent = (id) => {
    setIsEventId((prev) => (prev == null ? id : null));
  };

  const daysOfMonth = new Date(year, month + 1, 0).getDate();

  const getEventsPerMonth = () => {
    let eventList = [];
    for (let i = 0; i < daysOfMonth; i++) {
      const formatedMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
      const formatedDay = i < 10 ? `0${i}` : i;
      const identifier = `${year}/${formatedMonth}/${formatedDay}-id`;

      const eventArray = events.filter((event) => event.dateId == identifier);

      if (eventArray) {
        if (eventArray.length != 0) {
          eventArray.forEach((arrar) => {
            eventList.push(arrar);
          });
        }
      }
    }
    return eventList;
  };

  const eventsPerMonth = getEventsPerMonth();

  const monthString = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });

  const noEvent = () => {
    if (eventsPerMonth.length == 0) {
      return <h3>{`No events on ${monthString}`}</h3>;
    }
  };

  const noEventOnMonth = noEvent();

  return (
    <div className={styles.list}>
      <div className={styles.noEvent}> {noEventOnMonth}</div>
      {eventsPerMonth.map((event) => (
        <div onClick={() => handleEvent(event.id)} className={styles.box}>
          <Event event={event} isEventId={isEventId} />
        </div>
      ))}
    </div>
  );
}
