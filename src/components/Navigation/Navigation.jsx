import React, { useEffect, useState } from "react";
import NavigationLink from "./NavigationLink";
import NavigationStyle from "./Navigation.module.css";

// icons
import {
  ArrowRight,
  CalendarMonth,
  DeleteOutline,
  FavoriteBorder,
  FormatListBulleted,
  Home,
} from "@mui/icons-material";

export default function Navigation() {
  const [url, setUrl] = useState({
    navUrl: "",
    currentUrl: window.location.pathname,
  });

  const navLinkItems = [
    {
      icon: <Home className={NavigationStyle.icon} />,
      text: "Home",
      path: "/",
    },
    {
      icon: <FormatListBulleted className={NavigationStyle.icon} />,
      text: "Event list",
      path: "/event-list",
    },
    {
      icon: <CalendarMonth className={NavigationStyle.icon} />,
      text: "Calendar",
      path: "/calendar",
    },
    {
      icon: <FavoriteBorder className={NavigationStyle.icon} />,
      text: "Favorite",
      path: "/favorite",
    },
    {
      icon: <DeleteOutline className={NavigationStyle.icon} />,
      text: "Trash",

      path: "/trash",
    },
  ];

  const activeLink = () => {
    const currentButton = navLinkItems.find(
      (item) => item.path == url.currentUrl
    );

    if (currentButton) {
      setUrl((prevValue) => ({
        ...prevValue,
        navUrl: currentButton.path,
      }));
    }
  };

  const handleActiveLink = (url) => {
    setUrl((prevValue) => ({ ...prevValue, navUrl: url }));
  };

  useEffect(() => {
    activeLink();
  }, [url.currentUrl]);

  return (
    <div className={NavigationStyle.navigationBar}>
      <div className={NavigationStyle.navigationList}>
        {navLinkItems.map((item, index) => (
          <NavigationLink
            linkProps={{
              handleActiveLink,
              url,
              setUrl,
              navLinkItems,
              index,
              item,
            }}
          />
        ))}
      </div>
    </div>
  );
}
