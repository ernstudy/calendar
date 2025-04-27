import React, { useEffect, useState } from "react";
import calendarStyles from "./CalendarMonth.module.css";
import { useEventContext } from "../../context/EventContext";
import clsx from "clsx";
import { colors } from "@mui/material";

export default function CalendarMonth() {
  const {
    eventModalToggle,
    getEventDate,
    setEventPerDay_DateId,
    events,
    eventToEdit,
    globalDate,
  } = useEventContext();

  const { year, month } = globalDate();

  // generate a id with the current date
  const getCurrendayId = () => {
    const date = new Date();
    const currenYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const formatedMonth =
      currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
    const formatedDay = currentDay < 10 ? `0${currentDay}` : currentDay;
    return `${currenYear}/${formatedMonth}/${formatedDay}-id`;
  };

  const currentDayId = getCurrendayId();
  console.log("current day id", currentDayId);

  console.log("global date year month calendar month", year, month);

  // days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // days of month
  let daysOfMonth = [];

  const numDaysMonth = new Date(year, month + 1, 0).getDate();
  const dayString = new Date(year, month, 1).toDateString().split(" ")[0];
  const paddingDays = daysOfWeek.indexOf(dayString);

  const lastNumDaysMonth = new Date(year, month, 0).getDate();

  const calculateDaysOfMonth = () => {
    let result = [];
    for (let i = 1; i < numDaysMonth + paddingDays + 1; i++) {
      if (i > paddingDays) {
        //

        const formatedMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
        const formatedDay =
          i - paddingDays < 10 ? `0${i - paddingDays}` : i - paddingDays;

        // number of event per day
        const array = events.filter(
          (event) =>
            event.dateId == `${year}/${formatedMonth}/${formatedDay}-id`
        );
        const eventDaysArray = array && [...array];

        result.push({
          day: i - paddingDays,
          type: "day",
          id: `${year}/${formatedMonth}/${formatedDay}-id`,
          eventsPerDay: eventDaysArray,
        });
      } else {
        result.push({
          day: lastNumDaysMonth - paddingDays + i,
          type: "padding-day",
          id: "",
          eventsPerDay: [],
        });
      }
    }

    return result;
  };

  const daysGenerated = calculateDaysOfMonth();
  daysOfMonth = [...daysGenerated];

  //==== Open modal when any days Of month got clicked
  const handleMothdayClick = (monthDay, monthDayId) => {
    const eventDay = new Date(year, month, monthDay).toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
      }
    );
    const eventMonth = new Date(year, month, monthDay).toLocaleDateString(
      "en-US",
      {
        month: "2-digit",
      }
    );
    const eventDate = `${year}-${eventMonth}-${eventDay}`;
    getEventDate(eventDate);

    //
    setEventPerDay_DateId(monthDayId);

    // open modal
    eventModalToggle();
    //
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={calendarStyles.month}>
      {/*  */}

      <div className={calendarStyles.weekdays}>
        {daysOfWeek.map((dayWeek) => (
          <div className={calendarStyles.weekday} key={dayWeek}>
            {dayWeek}
          </div>
        ))}
      </div>

      <div className={calendarStyles.monthdays}>
        {daysOfMonth.map((dayMonth, index) => (
          <div
            key={index}
            className={calendarStyles.dayMonthBox}
            onClick={() => {
              if (dayMonth.type == "day") {
                handleMothdayClick(dayMonth.day, dayMonth.id);
              }
            }}
          >
            <span
              className={clsx(
                currentDayId == dayMonth.id && calendarStyles["day--current"],
                dayMonth.type == "day"
                  ? calendarStyles.dayMonth
                  : calendarStyles.paddingDayMonth
              )}
            >
              {dayMonth.day}
            </span>

            <div className={calendarStyles.eventsPerDayBox}>
              {dayMonth.eventsPerDay.map((event) => (
                <div
                  className={clsx(
                    calendarStyles.eventsPerDay,
                    event.status == "Pending" &&
                      calendarStyles["eventsPerDay--status-pending"],
                    event.status == "Completed" &&
                      calendarStyles["eventsPerDay--status-completed"],
                    event.status == "Canceled" &&
                      calendarStyles["eventsPerDay--status-canceled"]
                  )}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
