import React from "react";
import CalendarMonth from "../../components/CalendarMonth/CalendarMonth";
import { useEventContext } from "../../context/EventContext";
import calendarStyles from "./HomeCalendar.module.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function HomeCalendar() {
  const { globalDate, nav, setNav } = useEventContext();

  const { year, month, currentDay } = globalDate();

  const MonthString = new Date(year, month, currentDay).toLocaleString(
    "en-EN",
    {
      month: "long",
    }
  );
  return (
    <div className={calendarStyles.container}>
      <div className={calendarStyles.heading}>
        <div className={calendarStyles.date}>
          <h2>
            {MonthString}, {year}
          </h2>
        </div>

        <div className={calendarStyles.navigate}>
          <div
            className={calendarStyles.navigateButton}
            onClick={() => setNav(nav - 1)}
          >
            <NavigateBefore className={calendarStyles.icon} />
          </div>
          <div
            className={calendarStyles.navigateButton}
            onClick={() => setNav(nav + 1)}
          >
            <NavigateNext className={calendarStyles.icon} />
          </div>
        </div>
      </div>
      {/*  */}
      <CalendarMonth />
    </div>
  );
}
