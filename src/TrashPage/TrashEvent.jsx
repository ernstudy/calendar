import React from "react";
import trashStyle from "./TrashPage.module.css";
import { Delete, Restore } from "@mui/icons-material";

import { useEventContext } from "../context/EventContext";
export default function TrashEvent({ trashEvent }) {
  const { formateDate, settrashEvents, trashEvents, setEvents, events } =
    useEventContext();

  const [date, formatedTime] = formateDate(trashEvent);

  const removeFromTrash = () => {
    const newTrashArray = trashEvents.filter(
      (trash) => trash.id != trashEvent.id
    );
    settrashEvents([...newTrashArray]);
    localStorage.setItem("trash", JSON.stringify([...newTrashArray]));
  };

  const restoreEvent = () => {
    const eventToRecover = trashEvents.find(
      (trash) => trash.id == trashEvent.id
    );
    if (eventToRecover) {
      setEvents((prev) => [eventToRecover, ...prev]);
      localStorage.setItem(
        "events",
        JSON.stringify([eventToRecover, ...events])
      );

      //

      const newTrashArray = trashEvents.filter(
        (trash) => trash.id != eventToRecover.id
      );

      settrashEvents([...newTrashArray]);
      localStorage.setItem("trash", JSON.stringify([...newTrashArray]));
    }
  };

  return (
    <div className={trashStyle.trash}>
      <div className={trashStyle.info}>
        <div className={trashStyle.title}>{trashEvent.memo}</div>
        <div className={trashStyle.date}>
          {date} at {formatedTime}
        </div>
      </div>
      <div className={trashStyle.icons}>
        <div className={trashStyle.deleteIcon} onClick={removeFromTrash}>
          <Delete className={trashStyle.icon} />
        </div>
        <div className={trashStyle.recoverIcon} onClick={restoreEvent}>
          <Restore className={trashStyle.icon} />
        </div>
      </div>
    </div>
  );
}
