import { Container } from "@mui/material";
import React, { useState } from "react";
import styles from "./CalendarPage.module.css";
import { Link, Outlet } from "react-router-dom";
import CalendarMonth from "../components/CalendarMonth/CalendarMonth";
import EventModal from "../components/EventModal/EventModal";
import clsx from "clsx";
import Month from "./Month";
import Year from "./Year/Year";

export default function index() {
  const [activeComponent, setActiveComponent] = useState(<Year />);
  const navLink = [
    { name: "Year", component: <Year /> },
    { name: "Month", component: <Month /> },
  ];
  const [linkId, setLinkId] = useState("Year");
  const handleClick = (id, component) => {
    setLinkId(id);
    setActiveComponent(component);
  };
  return (
    <Container maxWidth="md">
      <div className={styles.container}>
        <div className={styles.navigation}>
          {navLink.map((link) => (
            <button
              className={clsx(
                styles.button,
                link.name == linkId && styles["button--clicked"]
              )}
              key={link.name}
              onClick={() => handleClick(link.name, link.component)}
            >
              {link.name}
            </button>
          ))}
        </div>

        {activeComponent}

        <EventModal />
      </div>
    </Container>
  );
}
