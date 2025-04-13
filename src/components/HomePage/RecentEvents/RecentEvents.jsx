import React, { useState } from "react";
import styles from "./RecentEvents.module.css";
import { Add } from "@mui/icons-material";
import clsx from "clsx";
import EventMenu from "../../../utils/EventMenu/EventMenu";
import { useEventMenuContext } from "../../../context/EventMenuContext";

export default function RecentEvents() {
  const { handleEventClick, isEventClicked } = useEventMenuContext();
  return (
    <div className={styles.container}>
      <div className={styles.addEvent}>
        <div className={styles.addEvent__input}>Add event</div>
        <div className={styles.addEvent__button}>
          <Add className={styles.addEvent__icon} />
        </div>
      </div>

      <div className={styles.recentEvent}>
        <div className={styles.heading}>
          <h3>Recent events</h3>
        </div>
        <div className={styles.list}>
          <div
            className={clsx(
              styles.event,
              isEventClicked ? styles["event--clicked"] : ""
            )}
            onClick={handleEventClick}
          >
            <div className={styles.info}>
              <div className={styles.title}>Go to the gym on saturday</div>
              <div className={styles.date}>May 24, 2025 at 06:30 PM</div>
            </div>
            <div className={styles.items}>
              <div className={clsx(styles["status--pending"])}>Pending</div>
              <EventMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
