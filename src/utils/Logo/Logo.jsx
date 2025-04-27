import React from "react";
import LogoStyle from "./Logo.module.css";
import { CalendarMonthOutlined, CalendarToday } from "@mui/icons-material";

export default function Logo() {
  return (
    <div className={LogoStyle.logo}>
      <CalendarMonthOutlined className={LogoStyle.icon} />
      <h1>Calendar</h1>
    </div>
  );
}
