import React from "react";
import ModalStsyles from "./EventModal.module.css";
import { Close } from "@mui/icons-material";
import { useEventContext } from "../../context/EventContext";
import clsx from "clsx";

export default function EventModal() {
  const { eventModalToggle, isEventModalOpened } = useEventContext();

  return (
    <div
      className={clsx(
        ModalStsyles.modal,
        isEventModalOpened && ModalStsyles["modal--opened"]
      )}
    >
      <div className={ModalStsyles.box}>
        <div className={ModalStsyles.closeButton} onClick={eventModalToggle}>
          <Close className={ModalStsyles.closeIcon} />
        </div>
        <div className={ModalStsyles.title}>
          <span className={ModalStsyles.label}>Title</span>
          <input
            type="text"
            className={ModalStsyles.inputTitle}
            placeholder="Memo"
            name="memo"
            maxLength={100}
            min={1}
          />
        </div>
        <div className={ModalStsyles.dateTimeBox}>
          <div className={ModalStsyles.time}>
            <span className={ModalStsyles.label}>Time</span>

            <input
              type="time"
              name="time"
              className={ModalStsyles.timeInput}
              // value=""
            />
          </div>
          <div className={ModalStsyles.date}>
            <span className={ModalStsyles.label}>Date</span>
            <input
              type="date"
              name="date"
              placeholder="12"
              min="1"
              max={12}
              maxLength={5}
              minLength={2}
              className={ModalStsyles.dateInput}
              // value={""}
            />
          </div>
        </div>

        <div className={ModalStsyles.createButton}>Create Event</div>
      </div>
    </div>
  );
}
