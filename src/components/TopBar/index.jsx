import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  let contextText = "";

  if (path.includes("/users/")) {
    const userId = path.split("/")[2];
    const user = models.userModel(userId);
    if (user) contextText = `Chi tiết của ${user.first_name} ${user.last_name}`;
  } else if (path.includes("/photos/")) {
    const userId = path.split("/")[2];
    const user = models.userModel(userId);
    if (user) contextText = `Ảnh của ${user.first_name} ${user.last_name}`;
  }

  return (
    <header className="topbar-custom">
      <div className="toolbar-custom">
        <div className="left-side">
          <h2 className="my-name">Lê Văn Nghệ</h2>
        </div>
        <div className="right-side">
          <h2 className="context-title">{contextText}</h2>
        </div>
      </div>
    </header>
  );
}

export default TopBar;