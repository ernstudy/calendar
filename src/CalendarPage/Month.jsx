import React from "react";
import CalendarMonth from "../components/CalendarMonth/CalendarMonth";
import calendarStyles from "./CalendarPage.module.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useEventContext } from "../context/EventContext";

export default function Month() {
  const { globalDate, setNav, nav } = useEventContext();
  const { year, month, currentDay } = globalDate();
  const monthString = new Date(year, month, currentDay).toLocaleString(
    "en-EN",
    {
      month: "long",
    }
  );

  return (
    <>
      <div className={calendarStyles.heading}>
        <div className={calendarStyles.button} onClick={() => setNav(nav - 1)}>
          <NavigateBefore className={calendarStyles.icon} />
        </div>
        <div className={calendarStyles.monthString}>
          {monthString}, {year}
        </div>
        <div className={calendarStyles.button} onClick={() => setNav(nav + 1)}>
          <NavigateNext className={calendarStyles.icon} />
        </div>
      </div>

      {/* calendar month component */}
      <CalendarMonth />
    </>
  );
}
