import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeStyle from "./HomePage.module.css";
import clsx from "clsx";
import RecentEvents from "./RecentEvents/RecentEvents";
import { EventMenuProvider } from "../../context/EventMenuContext";

export default function index() {
  // days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

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
  }, [day, month, year]);

  // console.log("day list", dayList);

  return (
    <Container maxWidth="lg" className={HomeStyle.container}>
      <div className={HomeStyle.month}>
        <div className={HomeStyle.heading}>
          <div className={HomeStyle.date}>
            <h2>May, 2025</h2>
          </div>
          <div className={HomeStyle.navigate}>
            <div className={HomeStyle.navigateButton}>
              <NavigateBefore className={HomeStyle.icon} />
            </div>
            <div className={HomeStyle.navigateButton}>
              <NavigateNext className={HomeStyle.icon} />
            </div>
          </div>
        </div>

        <div className={HomeStyle.weekdays}>
          {daysOfWeek.map((day, index) => (
            <div className={HomeStyle.weekday} key={index}>
              {day}
            </div>
          ))}
        </div>

        <div className={HomeStyle.monthdays}>
          {dayMonthList.map((day, index) => (
            <div key={index} className={HomeStyle.dayBox}>
              <span
                className={clsx(
                  day.type == "day" ? HomeStyle.day : HomeStyle.paddingDay
                )}
              >
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <EventMenuProvider>
        <RecentEvents />
      </EventMenuProvider>
    </Container>
  );
}
