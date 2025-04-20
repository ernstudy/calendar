import React, { useEffect, useState } from "react";
import clsx from "clsx";
import EventStyle from "./Event.module.css";
import EventMenu from "./EventMenu/EventMenu";
export default function Event({ event, isEventId }) {
  // formate date
  const [year, month, day] = event.date.split("-");

  const date = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // formate time
  const [hours, minutes] = event.time.split(":");

  const periodeHour = hours % 12 || 12;
  const formatedHour = periodeHour <= 10 ? `0${periodeHour}` : periodeHour;

  const periode = hours >= 12 ? "PM" : "AM";

  const formatedTime = `${formatedHour}:${minutes} ${periode}`;

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
