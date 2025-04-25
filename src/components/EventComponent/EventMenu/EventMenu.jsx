import React, { useState } from "react";
import EventMenuStyles from "./EventMenu.module.css";
import {
  Cancel,
  Delete,
  DoneAllOutlined,
  Edit,
  FavoriteBorder,
  MoreVertSharp,
  Pending,
} from "@mui/icons-material";
import clsx from "clsx";
import { useEventContext } from "../../../context/EventContext";

export default function EventMenu({ eventId, isEventId, event }) {
  const {
    eventClick,
    events,
    setEvents,
    deleteEvent,
    moveToTrash,
    addToFavorite,
    eventModalToggle,
    setEventToEdit,
    updateEventStatus,
  } = useEventContext();

  const handleDeleteEvent = () => {
    const currentEvent = events.find((event) => event.id == eventId);
    if (currentEvent) {
      moveToTrash(currentEvent);
      deleteEvent(currentEvent);
    }
  };

  const handleEditEvent = () => {
    eventModalToggle();
    const currentEvent = events.find((event) => event.id == eventId);
    setEventToEdit(currentEvent);
    document.body.style.overflow = "hidden";
  };

  const handleEventStatus = (status) => {
    updateEventStatus(status, eventId);
  };

  const handleFavorite = () => {
    const currentEvent = events.find((event) => event.id == eventId);
    if (currentEvent) {
      addToFavorite(currentEvent);
    }
  };

  return (
    <>
      {/* menu  */}
      <div className={EventMenuStyles.menu} onClick={eventClick}>
        <MoreVertSharp
          className={EventMenuStyles.menuIcon}
          aria-label="Open menu"
        />
        <ul
          className={clsx(
            EventMenuStyles.menuList,
            eventId == isEventId && EventMenuStyles["menuList--open"]
          )}
          role="menu"
        >
          <li
            className={EventMenuStyles.menuItem}
            role="menuitem"
            onClick={handleEditEvent}
          >
            {/* delete icon */}
            <Edit className={EventMenuStyles.menuItem__icon} />
            Edit
          </li>

          {event.status != "Pending" ? (
            <li
              className={EventMenuStyles.menuItem}
              role="menuitem"
              onClick={() => handleEventStatus("Pending")}
            >
              {/* done icon */}
              <Pending className={EventMenuStyles.menuItem__icon} />
              Pending
            </li>
          ) : (
            <>
              <li
                className={EventMenuStyles.menuItem}
                role="menuitem"
                onClick={() => handleEventStatus("Completed")}
              >
                {/* done icon */}
                <DoneAllOutlined className={EventMenuStyles.menuItem__icon} />
                Complete
              </li>
              <li
                className={EventMenuStyles.menuItem}
                role="menuitem"
                onClick={() => handleEventStatus("Canceled")}
              >
                {/* done icon */}
                <Cancel className={EventMenuStyles.menuItem__icon} />
                Cancel
              </li>
            </>
          )}

          <li
            className={EventMenuStyles.menuItem}
            role="menuitem"
            onClick={handleFavorite}
          >
            {/* favorite icon */}
            <FavoriteBorder className={EventMenuStyles.menuItem__icon} />
            Favorite
          </li>
          <li
            className={EventMenuStyles.menuItem}
            role="menuitem"
            onClick={handleDeleteEvent}
          >
            {/* delete icon */}
            <Delete className={EventMenuStyles.menuItem__icon} />
            Delete
          </li>
        </ul>
      </div>
    </>
  );
}
