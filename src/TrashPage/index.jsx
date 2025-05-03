import React from "react";
import trashStyle from "./TrashPage.module.css";
import { Container } from "@mui/material";

import TrashEvent from "./TrashEvent";
import { useEventContext } from "../context/EventContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function index() {
  const { trashEvents } = useEventContext();

  //auto animation
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  const isEmpty = () => {
    if (trashEvents.length == 0) {
      return <h3>No trah yet</h3>;
    }
  };

  const noTrash = isEmpty();

  return (
    <Container maxWidth="lg">
      <div className={trashStyle.container}>
        <div className={trashStyle.heading}>
          <h2>Trash</h2>
        </div>
        <div ref={parent} className={trashStyle.trashList}>
          {trashEvents.map((trashEvent) => (
            <TrashEvent trashEvent={trashEvent} />
          ))}
        </div>

        <div className={trashStyle.noTrash}>{noTrash}</div>
      </div>
    </Container>
  );
}
