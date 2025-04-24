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
      return { status: "status--pending", border: "border-color--pending" };
    }

    if (status == "Completed") {
      return { status: "status--completed", border: "border-color--completed" };
    }

    if (status == "Canceled") {
      return { status: "status--canceled", border: "border-color--canceled" };
    }
  };

  const eventStatus = setEventStatus();

  return (
    <>
      <div
        className={clsx(
          EventStyle.event,
          EventStyle[eventStatus.border],
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
          <div className={clsx(EventStyle[`${eventStatus.status}`])}>
            {event.status}
          </div>
          <EventMenu eventId={event.id} isEventId={isEventId} event={event} />
        </div>
      </div>
    </>
  );
}
