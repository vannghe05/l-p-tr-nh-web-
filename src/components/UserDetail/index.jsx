import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
    const {userId} = useParams();
    const user = models.userModel(userId);
    if(!user){
      return <Typography>Không tìm thấy người dùng!</Typography>
    }
   return (
    <div className="user-detail-container">
      <h1 className="user-name">
        {user.first_name} {user.last_name}
      </h1>
      <p className="user-info">
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </p>

      <p className="user-info">
        <strong>Địa điểm:</strong> {user.location}
      </p>
      <p className="user-description">
        {user.description}
      </p>
      <Link to={`/photos/${userId}`} className="btn-view-photos">
        Xem ảnh của {user.first_name}
      </Link>
    </div>
  );
}

export default UserDetail;
