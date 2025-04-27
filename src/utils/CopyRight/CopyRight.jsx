import React from "react";
import styles from "./CopyRight.module.css";

export default function CopyRight() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.CopyRight}>
      <p>
        &copy; {year} | Devoloped by <a href="https://ernstudy.com">Ernstudy</a>
      </p>
    </div>
  );
}
