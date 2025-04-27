import React from "react";
import CalendarMonth from "../../components/CalendarMonth/CalendarMonth";
import monthStyles from "./Month.module.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useEventContext } from "../../context/EventContext";
import EventsPerMonth from "../EventsPerMonth/EventsPerMonth";

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
    <div>
      <div className={monthStyles.heading}>
        <div className={monthStyles.button} onClick={() => setNav(nav - 1)}>
          <NavigateBefore className={monthStyles.icon} />
        </div>
        <div className={monthStyles.monthString}>
          <h3>
            {monthString}, {year}
          </h3>
        </div>
        <div className={monthStyles.button} onClick={() => setNav(nav + 1)}>
          <NavigateNext className={monthStyles.icon} />
        </div>
      </div>

      {/* calendar month component */}
      <CalendarMonth />

      <EventsPerMonth />
    </div>
  );
}
