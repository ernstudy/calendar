import React, { useEffect, useState } from "react";
import yearStyles from "./Year.module.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function CalendarYearPage() {
  // days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // const MonthOfYear = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "March",
  //   "May",
  //   "June",
  //   "July",
  //   "Augost",
  //   "September",
  //   "Octuber",
  //   "December",
  // ];
  // days of month
  const [monthsOfYear, setMonthsOfYear] = useState([]);

  // current date

  // nav
  const [navigateYear, setNavigateYear] = useState(0);
  const date = new Date();
  const currentDay = date.getDate();

  if (navigateYear != 0) {
    date.setFullYear(new Date().getFullYear() + navigateYear);
  }

  const year = date.getFullYear();

  // generate months

  const calculateMonthsOfYear = () => {
    let result = [];
    for (let month = 0; month < 12; month++) {
      console.log("valor de month", month);

      // number of days in the month
      const numDaysMonth = new Date(year, month + 1, 0).getDate();

      const dayString = new Date(year, month, 1).toDateString().split(" ")[0];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const paddingDays = days.indexOf(dayString);
      const lastNumDaysMonth = new Date(year, month, 0).getDate();

      let daylist = [];
      for (let day = 1; day < numDaysMonth + paddingDays + 1; day++) {
        if (day > paddingDays) {
          //

          daylist.push({
            day: day - paddingDays,
            type: "day",
          });
        } else {
          daylist.push({
            day: lastNumDaysMonth - paddingDays + day,
            type: "padding-day",
          });
        }
      }
      const montString = new Date(year, month).toLocaleDateString("en-US", {
        month: "long",
      });

      result = [...result, { daysmonth: daylist, name: montString }];
    }
    return result;
  };

  //   console.log("calculate days array", calculateDaysOfMonth());
  const generateMonthsOfYear = () => {
    const monthsGenerated = calculateMonthsOfYear();
    console.log("months generated", monthsGenerated);
    setMonthsOfYear(monthsGenerated);
  };

  console.log("month list", monthsOfYear);

  useEffect(() => {
    generateMonthsOfYear();
  }, [year]);

  //
  return (
    <div className={yearStyles.year}>
      <div className={yearStyles.heading}>
        <div className={yearStyles.navigation}>
          <div
            className={yearStyles.button}
            onClick={() => setNavigateYear(navigateYear - 1)}
          >
            <NavigateBefore className={yearStyles.icon} />
          </div>
          <h3>{year}</h3>
          <div
            className={yearStyles.button}
            onClick={() => setNavigateYear(navigateYear + 1)}
          >
            <NavigateNext className={yearStyles.icon} />
          </div>
        </div>
      </div>

      {/*  */}

      {/* <MonthOfYear daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} /> */}

      <div className={yearStyles.monthList}>
        {monthsOfYear.map((monthYear) => (
          <div className={yearStyles.month} key={monthYear.name}>
            <div className={yearStyles.title}>{monthYear.name}</div>
            <div className={yearStyles.weekdaysBox}>
              {daysOfWeek.map((weekday) => (
                <div key={weekday} className={yearStyles.weekday}>
                  {weekday}
                </div>
              ))}
            </div>
            <div className={yearStyles.daysmonthBox}>
              {monthYear.daysmonth.map((daymonth) => (
                <span className={yearStyles.daymonth}>
                  {daymonth.type == "day" && daymonth.day}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
