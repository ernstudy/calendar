import React from "react";
import { useEventContext } from "../../context/EventContext";
import { FavoriteBorder } from "@mui/icons-material";
import favoriteStyle from "./FavoriteEvent.module.css";
export default function FavoriteEvent({ favoriteEvent }) {
  const { formateDate, favoriteEvents, setFavoriteEvents } = useEventContext();
  const [date, formatedTime] = formateDate(favoriteEvent);
  const deleteFromFavorite = () => {
    const newFavoriteArray = favoriteEvents.filter(
      (favorite) => favorite.id != favoriteEvent.id
    );

    if (newFavoriteArray) {
      setFavoriteEvents([...newFavoriteArray]);
      localStorage.setItem("favorite", JSON.stringify([...newFavoriteArray]));
    }
  };

  const getStatus = () => {
    //
    const eventStatus = favoriteEvent.status;

    if (eventStatus == "Completed") {
      return "status--completed";
    }
    if (eventStatus == "Pending") {
      return "status--pending";
    }
    if (eventStatus == "Canceled") {
      return "status--canceled";
    }
  };

  const favoriteStatus = getStatus();
  return (
    <div className={favoriteStyle.favorite}>
      <div className={favoriteStyle.info}>
        <div className={favoriteStyle.title}>{favoriteEvent.memo}</div>
        <div className={favoriteStyle.date}>
          {date} at {formatedTime}
        </div>
      </div>
      <div className={favoriteStyle.icons}>
        <div className={favoriteStyle[`${favoriteStatus}`]}>
          {favoriteEvent.status}
        </div>

        <div
          className={favoriteStyle.favoriteIcon}
          onClick={deleteFromFavorite}
        >
          <FavoriteBorder className={favoriteStyle.icon} />
        </div>
      </div>
    </div>
  );
}
