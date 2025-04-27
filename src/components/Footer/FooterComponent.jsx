import React from "react";
import styles from "./Footer.module.css";
import CopyRight from "../../utils/CopyRight/CopyRight";
import { GitHub, LinkedIn } from "@mui/icons-material";

export default function FooterComponent() {
  return (
    <div className={styles.footer}>
      <div className={styles.socialNetworks}>
        <a href="https://github.com/ernstudy" className={styles.link}>
          <GitHub className={styles.icon} />
        </a>

        <a href="https://linkedin.com/in/ernstudy" className={styles.link}>
          <LinkedIn className={styles.icon} />
        </a>
      </div>

      {/* CopyRitght */}
      <CopyRight />
    </div>
  );
}
