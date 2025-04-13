import React, { useEffect, useState } from "react";
import HomeCalendarStyle from "./HomeCalendar.module.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import clsx from "clsx";
import { useEventContext } from "../../../context/EventContext";

export default function HomeCalendar() {
  const { eventModalToggle } = useEventContext();
  const [nav, setNav] = useState(0);
  // days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date();

  if (nav != 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const month = date.getMonth();
  console.log("month", month);
  const currentDay = date.getDate();
  const year = date.getFullYear();

  const headingMonth = new Date(year, month, currentDay).toLocaleString(
    "en-EN",
    {
      month: "long",
    }
  );

  const numDaysMonth = new Date(year, month + 1, 0).getDate();
  const dayString = new Date(year, month, 1).toDateString().split(" ")[0];
  const paddingDays = daysOfWeek.indexOf(dayString);

  // console.log("padding days:", paddingDays);

  const [dayMonthList, setDayMonthList] = useState([]);
  let result = [];
  const lastNumDaysMonth = new Date(year, month, 0).getDate();

  const calculateDays = () => {
    for (let i = 1; i < numDaysMonth + paddingDays + 1; i++) {
      if (i > paddingDays) {
        // console.log("days:", i - paddingDays);
        result.push({ day: i - paddingDays, type: "day" });
      } else {
        // console.log("prev padding days", lastNumDaysMonth - paddingDays + i);
        result.push({
          day: lastNumDaysMonth - paddingDays + i,
          type: "padding-day",
        });
      }
    }
    return result;
  };

  const generateDays = calculateDays();
  useEffect(() => {
    setDayMonthList(generateDays);
  }, [currentDay, month, year]);

  // console.log("day list", dayList);

  return (
    <div className={HomeCalendarStyle.month}>
      <div className={HomeCalendarStyle.heading}>
        <div className={HomeCalendarStyle.date}>
          <h2>
            {headingMonth}, {year}
          </h2>
        </div>
        <div className={HomeCalendarStyle.navigate}>
          <div
            className={HomeCalendarStyle.navigateButton}
            onClick={() => setNav(nav - 1)}
          >
            <NavigateBefore className={HomeCalendarStyle.icon} />
          </div>
          <div
            className={HomeCalendarStyle.navigateButton}
            onClick={() => setNav(nav + 1)}
          >
            <NavigateNext className={HomeCalendarStyle.icon} />
          </div>
        </div>
      </div>

      <div className={HomeCalendarStyle.weekdays}>
        {daysOfWeek.map((day, index) => (
          <div className={HomeCalendarStyle.weekday} key={index}>
            {day}
          </div>
        ))}
      </div>

      <div className={HomeCalendarStyle.monthdays}>
        {dayMonthList.map((day, index) => (
          <div
            key={index}
            className={HomeCalendarStyle.dayBox}
            onClick={() => {
              if (day.type == "day") {
                eventModalToggle();
              }
            }}
          >
            <span
              className={clsx(
                currentDay == day.day &&
                  nav == 0 &&
                  HomeCalendarStyle["day--current"],
                day.type == "day"
                  ? HomeCalendarStyle.day
                  : HomeCalendarStyle.paddingDay
              )}
            >
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
