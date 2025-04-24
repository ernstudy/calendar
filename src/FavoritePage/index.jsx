import React from "react";
import { useEventContext } from "../context/EventContext";
import FavoriteEvent from "./FavoriteEvent";
import { Container } from "@mui/material";
import favoriteStyle from "./FavoriteEvent.module.css";

export default function index() {
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
        <div className={favoriteStyle.heading}>Favorite</div>
        <div className={favoriteStyle.favoriteList}>
          {favoriteEvents.map((favoriteEvent) => (
            <FavoriteEvent favoriteEvent={favoriteEvent} />
          ))}
        </div>

        <div className={favoriteStyle.noFavoriteEvent}>{noFavoriteEvent}</div>
      </div>
    </Container>
  );
}
