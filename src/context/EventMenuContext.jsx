import { MenuList } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const EventMenuContext = createContext();

const EventMenuProvider = ({ children }) => {
  // open and close menu list
  const [openMenuList, setOpenMenuList] = useState(false);
  // select event and open menu list
  const [isEventClicked, setIsEventClicked] = useState(false);
  const handleEventClick = () => {
    setIsEventClicked(!isEventClicked);
    setOpenMenuList(!openMenuList);
    console.log("event clicked");
  };

  return (
    <EventMenuContext.Provider
      value={{ handleEventClick, openMenuList, isEventClicked }}
    >
      {children}
    </EventMenuContext.Provider>
  );
};

const useEventMenuContext = () => {
  const context = useContext(EventMenuContext);
  return context;
};

export { EventMenuProvider, useEventMenuContext };
