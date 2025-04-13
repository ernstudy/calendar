import React from "react";
import LogoStyle from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={LogoStyle.logo}>
      <h1>
        Cal<span className={LogoStyle.decorate}>ern</span>dar
      </h1>
    </div>
  );
}
