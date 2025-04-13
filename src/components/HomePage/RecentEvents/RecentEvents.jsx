import React, { useState } from "react";
import styles from "./RecentEvents.module.css";
import { Add } from "@mui/icons-material";
import Event from "../../EventComponent/Event";

export default function RecentEvents() {
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
          <Event />
        </div>
      </div>
    </div>
  );
}
