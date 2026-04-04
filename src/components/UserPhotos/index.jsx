import React from "react";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserPhotos() {
  
  const { userId } = useParams();
  
  
  const photos = models.photoOfUserModel(userId);

  
  if (!photos || photos.length === 0) {
    return <Typography variant="h6">Người dùng này chưa có ảnh nào.</Typography>;
  }

  
  return (
    <div className="photos-container">
      <h1 className="main-title">Ảnh của người dùng</h1>

      {photos.map((photo) => (
        <div key={photo._id} className="photo-card">
          <img 
            src={require(`../../images/${photo.file_name}`)} 
            alt="User photo" 
            className="user-img"
          />
          <div className="photo-info">
            <small className="post-date">
              Ngày đăng: {new Date(photo.date_time).toLocaleString()}
            </small>
            <hr className="divider" />
            <h3 className="comment-title">Bình luận:</h3>
            {photo.comments ? photo.comments.map((comment) => (
              <div key={comment._id} className="comment-box">
                <p className="comment-user">
                  <Link to={`/users/${comment.user._id}`} className="author-link">
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  <span className="comment-date">
                    ({new Date(comment.date_time).toLocaleString()})
                  </span>
                </p>
                <p className="comment-text">{comment.comment}</p>
              </div>
            )) : (
              <p className="no-comment">Chưa có bình luận nào.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;