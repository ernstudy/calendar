import React from "react";

import styles from "./EventForDay.module.css";

export default function EventForDay({ num }) {
  return <div className={styles.EventForDay}>{`Events: ${num}`}</div>;
}
