import React from "react";
import { Link } from "react-router-dom";
import navigationStyle from "./Navigation.module.css";
import clsx from "clsx";
import { ArrowRight } from "@mui/icons-material";

export default function NavigationLink({ linkProps }) {
  const { handleActiveLink, url, index, item } = linkProps;

  return (
    <>
      <Link
        to={item.path}
        className={clsx(
          navigationStyle.linkButton,
          url.navUrl == item.path && navigationStyle["linkButton--active"]
        )}
        onClick={() => handleActiveLink(item.path)}
        key={index}
      >
        <div className={navigationStyle.items}>
          <div className={navigationStyle.icons}>{item.icon}</div>
          <div className={navigationStyle.text}>{item.text}</div>
        </div>
        <div
          className={navigationStyle.rightIcon}
          style={{
            display: url.navUrl == item.path ? "block" : "none",
          }}
        >
          <ArrowRight className={navigationStyle.icon} />
        </div>
      </Link>
    </>
  );
}
