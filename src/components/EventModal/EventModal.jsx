import React, { useEffect, useState } from "react";
import ModalStsyles from "./EventModal.module.css";
import { Close } from "@mui/icons-material";
import { useEventContext } from "../../context/EventContext";
import clsx from "clsx";

export default function EventModal() {
  const {
    eventModalToggle,
    createEvent,
    isEventModalOpened,
    eventDate,
    getEventDate,
    setEventToEdit,
    editEvent,
    eventToEdit,
    setEventPerDay_DateId,
  } = useEventContext();

  const [input, setInput] = useState({
    memo: "",
    date: "",
    time: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setInput((prevValue) => ({ ...prevValue, [name]: value }));
    if (input.date != "" && input.memo != "" && input.time != "") {
      setError(false);
    }
  };

  //  input validation
  const [error, setError] = useState(false);
  // create event and validate input
  const handlecreate = () => {
    if (input.date != "" && input.memo != "" && input.time != "") {
      eventModalToggle();

      //
      if (eventDate != "") {
        // create event when user click on any date
        createEvent(input);
      } else {
        // edit event if there is a event to edit
        if (eventToEdit != null) {
          editEvent(input);
        } else {
          // create a event when user only click on the add button and all inputs are empty
          createEvent(input);
        }
      }

      getEventDate("");
      setEventPerDay_DateId("");
      setEventToEdit(null);

      setInput({ date: "", time: "", memo: "" });
      //
      document.body.style.overflow = "auto";
      return;
    }

    setError(true);
  };

  const closeModal = () => {
    eventModalToggle();
    setError(false);
    getEventDate("");
    setInput({ date: "", time: "", memo: "" });
    setEventToEdit(null);
    setEventPerDay_DateId("");
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (eventDate != "") {
      setInput((prev) => ({ ...prev, date: eventDate }));
    }
  }, [eventDate]);

  useEffect(() => {
    if (eventToEdit != null) {
      console.log("my event to edite", eventToEdit.memo);

      setInput(() => ({
        memo: eventToEdit.memo,
        time: eventToEdit.time,
        date: eventToEdit.date,
        id: eventToEdit.id,
        status: eventToEdit.status,
      }));
    }
  }, [eventToEdit]);

  return (
    <div
      className={clsx(
        ModalStsyles.modal,
        isEventModalOpened && ModalStsyles["modal--opened"]
      )}
    >
      <div className={ModalStsyles.box}>
        <div className={ModalStsyles.closeButton} onClick={closeModal}>
          <Close className={ModalStsyles.closeIcon} />
        </div>
        <div className={ModalStsyles.title}>
          <span
            className={ModalStsyles.label}
            style={{ color: error && input.memo == "" && "red" }}
          >
            Title*
          </span>
          <input
            type="text"
            className={ModalStsyles.inputTitle}
            placeholder="Memo"
            name="memo"
            maxLength={60}
            min={1}
            value={input.memo}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className={ModalStsyles.dateTimeBox}>
          <div className={ModalStsyles.time}>
            <span
              className={ModalStsyles.label}
              style={{ color: error && input.time == "" && "red" }}
            >
              Time*
            </span>

            <input
              type="time"
              name="time"
              className={ModalStsyles.timeInput}
              value={input.time.trim()}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className={ModalStsyles.date}>
            {eventDate != "" ? (
              <span className={ModalStsyles.label}>Selected date*</span>
            ) : (
              <span
                className={ModalStsyles.label}
                style={{ color: error && input.date == "" && "red" }}
              >
                Date*
              </span>
            )}
            <input
              type="date"
              name="date"
              min="1"
              max={12}
              maxLength={5}
              minLength={2}
              className={ModalStsyles.dateInput}
              value={input.date.trim()}
              onChange={(e) => handleInput(e)}
              readOnly={eventDate != "" && true}
            />
          </div>
        </div>

        <div className={ModalStsyles.createButton} onClick={handlecreate}>
          Create Event
        </div>
      </div>
    </div>
  );
}
