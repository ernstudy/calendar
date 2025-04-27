import {
  Add,
  CalendarMonth,
  DarkMode,
  DarkModeOutlined,
  DarkModeRounded,
  DarkModeSharp,
  DarkModeTwoTone,
  Delete,
  Favorite,
  Home,
  LightModeOutlined,
  ListAlt,
  Menu,
} from "@mui/icons-material";
import { Drawer, List, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import navStyles from "./BottomNavigation.module.css";
import clsx from "clsx";
import EventModal from "../EventModal/EventModal";
import { useEventContext } from "../../context/EventContext";
import CopyRight from "../../utils/CopyRight/CopyRight";
import { useThemeContext } from "../../context/Theme";

export default function BottomNavigation() {
  const { themeToggle, theme } = useThemeContext();
  const { eventModalToggle, setEventPerDay_DateId } = useEventContext();
  const navLinks = [
    {
      path: "/event-list",
      icon: <ListAlt className={navStyles.icon} />,
      name: "Event list",
    },
    {
      path: "/calendar",
      icon: <CalendarMonth className={navStyles.icon} />,
      name: "Calendar",
    },
    {
      path: "/favorite",
      icon: <Favorite className={navStyles.icon} />,
      name: "Favorite",
    },
    {
      path: "/trash",
      icon: <Delete className={navStyles.icon} />,
      name: "Trash",
    },
  ];

  const currentUrl = window.location.pathname;
  const [linkUrl, setLinkUrl] = useState("");
  const [open, setOpen] = useState(false);

  const activeLink = (url) => {
    setLinkUrl(`${url}`);
    setOpen(false);
  };

  const getLinkPath = () => {
    const currentLink = navLinks.find((link) => link.path == currentUrl);
    if (currentLink) {
      setLinkUrl(`${currentLink.path}`);
    }
  };

  const addEvent = () => {
    eventModalToggle();
    //
    setEventPerDay_DateId("");
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    getLinkPath();
  }, [currentUrl, linkUrl]);

  //
  return (
    <div className={navStyles.container}>
      <div
        className={navStyles.theme}
        onClick={themeToggle}
        style={{ display: open ? "none" : "block" }}
      >
        {theme == "light" ? (
          <DarkModeTwoTone className={navStyles.themeIcon} />
        ) : (
          <LightModeOutlined className={navStyles.themeIcon} />
        )}
      </div>

      {/*  */}
      <div
        className={navStyles.buttons}
        style={{ display: open ? "none" : "flex" }}
      >
        <Link
          to="/"
          className={clsx(
            navStyles.homeButton,
            currentUrl == "/" && navStyles["homeButton--active"]
          )}
          role="button"
          onClick={() => activeLink("/")}
        >
          <Home className={navStyles.icon} aria-label="icon" />
        </Link>

        {/* add button */}
        <div className={navStyles.addButton} role="button" onClick={addEvent}>
          <Add className={navStyles.icon} aria-label="icon" />
        </div>

        <div
          className={navStyles.menuButton}
          role="button"
          onClick={() => setOpen(!open)}
        >
          <Menu className={navStyles.icon} aria-label="icon" />
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="bottom"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <div className={navStyles.nav}>
          <div className={navStyles.list}>
            {navLinks.map((link) => (
              <Link
                to={link.path}
                className={clsx(
                  navStyles.link,
                  link.path == linkUrl && navStyles["link--active"]
                )}
                onClick={() => activeLink(link.path)}
              >
                <div className={navStyles.linkIcon}>{link.icon}</div>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className={navStyles.CopyRightBox}>
          <CopyRight />
        </div>
      </Drawer>

      <EventModal />
    </div>
  );
}
