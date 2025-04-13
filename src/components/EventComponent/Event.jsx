import React, { useEffect, useState } from "react";
import EventMenu from "./EventMenu/EventMenu";
import { useEventContext } from "../../context/EventContext";
import clsx from "clsx";
import EventStyle from "./Event.module.css";
export default function Event() {
  const { eventClick, isEventClicked, eventDetails } = useEventContext();

  const [eventId, setEventId] = useState(null);

  const handleEventClick = (id) => {
    eventClick();
    setEventId(id);
  };

  return (
    <>
      {eventDetails.map((event, index) => (
        <div
          className={clsx(
            EventStyle.event,
            isEventClicked && eventId == index
              ? EventStyle["event--clicked"]
              : ""
          )}
          onClick={() => handleEventClick(index)}
          key={index}
        >
          <div className={EventStyle.info}>
            <div className={EventStyle.title}>{event.title}</div>
            <div className={EventStyle.date}>{event.date}</div>
          </div>
          <div className={EventStyle.items}>
            <div className={clsx(EventStyle["status--pending"])}>
              {event.status}
            </div>
            <EventMenu id={index} eventId={eventId} />
          </div>
        </div>
      ))}
    </>
  );
}
