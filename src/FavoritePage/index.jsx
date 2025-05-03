import React from "react";
import { useEventContext } from "../context/EventContext";
import FavoriteEvent from "./FavoriteEvent";
import { Container } from "@mui/material";
import favoriteStyle from "./FavoriteEvent.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function index() {
  // animate events
  const [parent, enableAnimations] = useAutoAnimate();

  const { favoriteEvents } = useEventContext();
  const isEmpty = () => {
    if (favoriteEvents.length == 0) {
      return <h3>No favorite event yet</h3>;
    }
  };

  const noFavoriteEvent = isEmpty();

  return (
    <Container maxWidth="lg">
      <div className={favoriteStyle.container}>
        <div className={favoriteStyle.heading}>
          <h2>Favorite</h2>
        </div>
        <div ref={parent} className={favoriteStyle.favoriteList}>
          {favoriteEvents.map((favoriteEvent) => (
            <FavoriteEvent favoriteEvent={favoriteEvent} />
          ))}
        </div>

        <div className={favoriteStyle.noFavoriteEvent}>{noFavoriteEvent}</div>
      </div>
    </Container>
  );
}
