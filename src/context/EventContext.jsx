import React, { createContext, useContext, useState } from "react";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState([
    {
      title: "Go to the gym on saturday",
      date: "May 24, 2025 at 06:30 PM",
      status: "pending",
      id: null,
      isClicked: false,
      menuOpened: false,
    },
    {
      title: "Watch tv later at 7PM",
      date: "May 24, 2025 at 07:00 PM",
      status: "cancel",
      id: null,
      isClicked: false,
      menuOpened: false,
    },
    {
      title: "Play football on monday",
      date: "May 26, 2025 at 09:00 AM",
      status: "done",
      id: null,
      isClicked: false,
      menuOpened: false,
    },
  ]);
  // open and close menu list
  // select event and open menu list
  const [isEventClicked, setIsEventClicked] = useState(false);
  const eventClick = () => {
    setIsEventClicked(!isEventClicked);
    console.log("event clicked");
  };

  return (
    <EventContext.Provider
      value={{ eventClick, isEventClicked, setEventDetails, eventDetails }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEventContext = () => {
  const context = useContext(EventContext);
  return context;
};

export { EventProvider, useEventContext };
