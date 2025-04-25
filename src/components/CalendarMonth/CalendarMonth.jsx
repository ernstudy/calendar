import React, { useEffect, useState } from "react";
import calendarStyles from "./CalendarMonth.module.css";
import { useEventContext } from "../../context/EventContext";
import clsx from "clsx";

export default function CalendarMonth() {
  const {
    eventModalToggle,
    getEventDate,
    setEventPerDay_DateId,
    events,
    eventToEdit,
    nav,
    globalDate,
  } = useEventContext();

  const { year, month, currentDay } = globalDate();

  console.log("global date year month calendar month", year, month);

  // days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // days of month
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  // current date

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
        const daysEvent = events.filter(
          (event) =>
            event.dateId == `${year}/${formatedMonth}/${formatedDay}-id`
        );
        const numberOfEventsPerDay = daysEvent && daysEvent.length;

        result.push({
          day: i - paddingDays,
          type: "day",
          id: `${year}/${formatedMonth}/${formatedDay}-id`,
          eventsPerDay: numberOfEventsPerDay,
        });
      } else {
        result.push({
          day: lastNumDaysMonth - paddingDays + i,
          type: "padding-day",
          id: "",
          eventsPerDay: 0,
        });
      }
    }
    return result;
  };

  // console.log("calculate days array", result, calculateDaysOfMonth());
  const generateDaysOfMonth = () => {
    const daysGenerated = calculateDaysOfMonth();
    setDaysOfMonth(daysGenerated);
  };

  useEffect(() => {
    generateDaysOfMonth();
  }, [currentDay, month, year, events.length, eventToEdit]);

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
                currentDay == dayMonth.day &&
                  nav == 0 &&
                  calendarStyles["day--current"],
                dayMonth.type == "day"
                  ? calendarStyles.dayMonth
                  : calendarStyles.paddingDayMonth
              )}
            >
              {dayMonth.day}
            </span>
            {dayMonth.eventsPerDay != 0 && (
              <span className={calendarStyles.eventsPerDay}>
                {dayMonth.eventsPerDay}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
