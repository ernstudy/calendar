import React, { useEffect, useState } from "react";
import clsx from "clsx";
import EventStyle from "./Event.module.css";
import EventMenu from "./EventMenu/EventMenu";
import { useEventContext } from "../../context/EventContext";
export default function Event({ event, isEventId }) {
  const { formateDate } = useEventContext();

  const [date, formatedTime] = formateDate(event);

  const setEventStatus = () => {
    const status = event.status;
    if (status == "Pending") {
      return "status--pending";
    }

    if (status == "Completed") {
      return "status--completed";
    }

    if (status == "Canceled") {
      return "status--canceled";
    }
  };

  const eventStatus = setEventStatus();

  return (
    <>
      <div
        className={clsx(
          EventStyle.event,
          event.id == isEventId && EventStyle["event--clicked"]
        )}
      >
        <div className={EventStyle.info}>
          <div className={EventStyle.title}>{event.memo}</div>
          <div className={EventStyle.date}>
            {date} at {formatedTime}
          </div>
        </div>
        <div className={EventStyle.items}>
          <div className={clsx(EventStyle[`${eventStatus}`])}>
            {event.status}
            {/* {console.log("event status here", eventStatus)} */}
          </div>
          <EventMenu eventId={event.id} isEventId={isEventId} event={event} />
        </div>
      </div>
    </>
  );
}
