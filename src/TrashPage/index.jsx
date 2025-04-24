import React from "react";
import trashStyle from "./TrashPage.module.css";
import { Container } from "@mui/material";

import TrashEvent from "./TrashEvent";
import { useEventContext } from "../context/EventContext";

export default function index() {
  const { trashEvents } = useEventContext();

  const isEmpty = () => {
    if (trashEvents.length == 0) {
      return <h3>No trah yet</h3>;
    }
  };

  const noTrash = isEmpty();

  return (
    <Container maxWidth="lg">
      <div className={trashStyle.container}>
        <div className={trashStyle.heading}>Trash</div>
        <div className={trashStyle.trashList}>
          {trashEvents.map((trashEvent) => (
            <TrashEvent trashEvent={trashEvent} />
          ))}
        </div>

        <div className={trashStyle.noTrash}>{noTrash}</div>
      </div>
    </Container>
  );
}
