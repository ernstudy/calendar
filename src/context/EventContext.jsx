import React, { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  // ***** EVENT LIST ******
  // this array contains all events created in this app
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || [];
  });

  // this array contains all favorite events
  const [favoriteEvents, setFavoriteEvents] = useState(
    () => JSON.parse(localStorage.getItem("favorite")) || []
  );

  // ***** NO EVENT YET ******
  // if the event list is empty, display this
  const isNoEvent = () => {
    if (events.length == 0) {
      return <span className="noEvent">No event yet</span>;
    }
  };
  const noEventYet = isNoEvent();

  // event for day identification
  const [eventPerDay_DateId, setEventPerDay_DateId] = useState("");

  // update event day Identification;
  useEffect(() => {
    setEventPerDay_DateId((prev) => prev);
  }, [eventPerDay_DateId]);

  // ***** CREATE EVENT ******
  const createEvent = (input) => {
    // divide the date like 2000-12-30 this to this 2000 12 30 by a -
    const [year, month, day] = input.date.split("-");
    // this is a second id, it can be repeted many time.
    // we get this id when user click in any day and date or from the input date
    // we use it to check if any event has already been created in a specific date or if mamy event has the same date,
    // and then to display the amount in the specific day

    const generateEventDateId = () => {
      if (eventPerDay_DateId == "") {
        return `${year}/${month}/${day}-id`;
      } else {
        return eventPerDay_DateId;
      }
    };

    const eventDateId = generateEventDateId();

    // add the first or new event
    const newEvent = {
      ...input,
      id: Date.now(),
      status: "Pending",
      dateId: eventDateId,
    };
    setEvents((prevValue) => [newEvent, ...prevValue]);
    localStorage.setItem("events", JSON.stringify([newEvent, ...events]));
  };

  // ***** EDIT EVENT ******
  // get the event to edite when it got clicked
  const [eventToEdit, setEventToEdit] = useState(null);

  const editEvent = (input) => {
    const [year, month, day] = input.date.split("-");
    const eventDateId = `${year}/${month}/${day}-id`;

    // get event id
    const eventToEditId = eventToEdit.id;
    const modifiedArray = events.map((event) =>
      event.id == eventToEditId
        ? {
            ...event,
            memo: input.memo,
            date: input.date,
            time: input.time,
            dateId: eventDateId,
          }
        : event
    );
    setEvents(modifiedArray);
    localStorage.setItem("events", JSON.stringify(modifiedArray));

    // favorite
    const modifiedFavoriteArray = favoriteEvents.map((favorite) =>
      favorite.id == eventToEditId
        ? {
            ...favorite,
            memo: input.memo,
            date: input.date,
            time: input.time,
            dateId: eventDateId,
          }
        : favorite
    );
    setFavoriteEvents([...modifiedFavoriteArray]);
    localStorage.setItem(
      "favorite",
      JSON.stringify([...modifiedFavoriteArray])
    );
  };

  useEffect(() => {
    setEventToEdit((prev) => prev);
  }, [eventToEdit]);

  // ***** UPDATE EVENT STATUS ******
  const updateEventStatus = (eventStatus, eventId) => {
    const modifiedStatusArray = events.map((event) =>
      event.id == eventId ? { ...event, status: eventStatus } : event
    );

    setEvents(modifiedStatusArray);
    localStorage.setItem("events", JSON.stringify(modifiedStatusArray));
    //
    const modifiedFavoriteStatusArray = favoriteEvents.map((favorite) =>
      favorite.id == eventId ? { ...favorite, status: eventStatus } : favorite
    );

    setFavoriteEvents([...modifiedFavoriteStatusArray]);
    localStorage.setItem(
      "favorite",
      JSON.stringify([...modifiedFavoriteStatusArray])
    );
    //
  };

  //--- UPDATE EVENT LIST ----
  // Update event list when  the lenght of event list changes
  useEffect(() => {
    setEvents((prevValue) => [...prevValue]);
  }, [events.length]);

  // ***** DELETE EVENT ******
  // delete a event of the even list when this got clicked
  const deleteEvent = (eventToDelete) => {
    // delete this event from events array
    const newArray = events.filter((event) => event.id != eventToDelete.id);
    if (newArray) {
      setEvents(newArray);
      localStorage.setItem("events", JSON.stringify(newArray));
    }

    // delete this event from favorite events
    const newFavoriteArray = favoriteEvents.filter(
      (event) => event.id != eventToDelete.id
    );

    if (newFavoriteArray) {
      setFavoriteEvents(newFavoriteArray);
      localStorage.setItem("favorite", JSON.stringify(newFavoriteArray));
    }
  };

  // ***** MOVE EVENT TO TRASH ******
  const [trashEvents, settrashEvents] = useState(
    () => JSON.parse(localStorage.getItem("trash")) || []
  );

  const moveToTrash = (event) => {
    settrashEvents((prev) => [...prev, event]);
    localStorage.setItem("trash", JSON.stringify([...trashEvents, event]));
  };

  // ***** ADD EVENT TO FAVORITE ******
  const addToFavorite = (newEvent) => {
    const isEvent = favoriteEvents.find((event) => event.id == newEvent.id);

    if (!isEvent) {
      setFavoriteEvents((prev) => [newEvent, ...prev]);
      localStorage.setItem(
        "favorite",
        JSON.stringify([newEvent, ...favoriteEvents])
      );
    }
  };

  // ******* CLOSE AND OPEN MODAL********
  // open and close menu list when any event got clicked,
  // and open list of menu
  const [isEventClicked, setIsEventClicked] = useState(false);
  const eventClick = () => {
    setIsEventClicked(!isEventClicked);
  };

  // ******* CLOSE AND OPEN MODAL********
  // Close the modal, when user click on add event button
  //  or when any day on the calendar got clicked
  const [isEventModalOpened, setIsEventModalOpened] = useState(false);
  const eventModalToggle = () => {
    setIsEventModalOpened(!isEventModalOpened);
  };

  // ******* GET EVENT DATE ********
  // get evet date when user click on a day in the calendar
  // and set it in the input when the modal open
  const [eventDate, setEventDate] = useState("");
  const getEventDate = (date) => {
    setEventDate(date);
  };

  // ******* Formate EVENT DATE ********
  const formateDate = (event) => {
    const [year, month, day] = event.date.split("-");

    const date = new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // formate time
    const [hours, minutes] = event.time.split(":");

    const periodeHour = hours % 12 || 12;
    const formatedHour = periodeHour <= 10 ? `0${periodeHour}` : periodeHour;

    const periode = hours >= 12 ? "PM" : "AM";

    const formatedTime = `${formatedHour}:${minutes} ${periode}`;

    let result = [date, formatedTime];
    return result;
  };

  // --- update the event date cliked ----
  useEffect(() => {
    setEventDate((prev) => prev);
  }, [eventDate]);

  // return all variables and functions
  return (
    <EventContext.Provider
      value={{
        eventClick,
        isEventClicked,
        eventModalToggle,
        isEventModalOpened,
        setIsEventModalOpened,
        createEvent,
        deleteEvent,
        moveToTrash,
        trashEvents,
        settrashEvents,
        events,
        setEvents,
        noEventYet,
        getEventDate,
        eventDate,
        setEventPerDay_DateId,
        editEvent,
        setEventToEdit,
        eventToEdit,
        updateEventStatus,
        addToFavorite,
        setFavoriteEvents,
        favoriteEvents,
        formateDate,
      }}
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
