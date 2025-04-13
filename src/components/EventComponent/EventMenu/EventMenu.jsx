import React, { useState } from "react";
import EventMenuStyles from "./EventMenu.module.css";
import {
  Delete,
  Done,
  Edit,
  FavoriteBorder,
  MoreVertSharp,
} from "@mui/icons-material";
import clsx from "clsx";
import { useEventContext } from "../../../context/EventContext";

export default function EventMenu({ id, eventId }) {
  const { eventClick, isEventClicked } = useEventContext();
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
            isEventClicked && id == eventId
              ? EventMenuStyles["menuList--open"]
              : ""
          )}
          role="menu"
        >
          <li className={EventMenuStyles.menuItem} role="menuitem">
            {/* delete icon */}
            <Edit className={EventMenuStyles.menuItem__icon} />
            Edit
          </li>
          <li className={EventMenuStyles.menuItem} role="menuitem">
            {/* done icon */}
            <Done className={EventMenuStyles.menuItem__icon} />
            Done
          </li>
          <li className={EventMenuStyles.menuItem} role="menuitem">
            {/* favorite icon */}
            <FavoriteBorder className={EventMenuStyles.menuItem__icon} />
            Favorite
          </li>
          <li className={EventMenuStyles.menuItem} role="menuitem">
            {/* delete icon */}
            <Delete className={EventMenuStyles.menuItem__icon} />
            Delete
          </li>
        </ul>
      </div>
    </>
  );
}
