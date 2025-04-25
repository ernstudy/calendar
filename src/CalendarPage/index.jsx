import { Container } from "@mui/material";
import React, { useState } from "react";
import styles from "./CalendarPage.module.css";
import { Link, Outlet } from "react-router-dom";
import CalendarMonth from "../components/CalendarMonth/CalendarMonth";
import EventModal from "../components/EventModal/EventModal";
import clsx from "clsx";
import Month from "./Month";
import Year from "./Year/Year";
import { useEventContext } from "../context/EventContext";

export default function index() {
  const { setNav } = useEventContext();
  // const [activeComponent, setActiveComponent] = useState(
  //   <Year onActiveComponent={onActiveComponent} />
  // );

  const [activeComponent, setActiveComponent] = useState("year");
  const [linkId, setLinkId] = useState("Year");
  const activeComponentToggle = (id) => {
    setLinkId(id);
    setActiveComponent((prev) => (prev == "year" ? "month" : "year"));
  };

  const onActiveComponent = () => {
    activeComponentToggle();
    setLinkId("Month");
    setNav(0);
  };

  const navLink = ["Year", "Month"];

  return (
    <Container maxWidth="md">
      <div className={styles.container}>
        <div className={styles.navigation}>
          {navLink.map((link) => (
            <button
              className={clsx(
                styles.button,
                link == linkId && styles["button--clicked"]
              )}
              key={link}
              onClick={() => activeComponentToggle(link)}
            >
              {link}
            </button>
          ))}
        </div>

        {activeComponent == "year" ? (
          <Year onActiveComponent={onActiveComponent} />
        ) : (
          <Month />
        )}

        <EventModal />
      </div>
    </Container>
  );
}
