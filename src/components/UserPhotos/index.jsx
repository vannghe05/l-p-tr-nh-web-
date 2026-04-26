import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  // 1. Khởi tạo state là mảng rỗng để chứa danh sách ảnh
  const [photos, setPhotos] = useState([]);

  // 2. useEffect để lấy ảnh từ Server
  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await fetchModel(
          `https://82w65g-8081.csb.app/api/photo/${userId}`
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy ảnh:", error);
      }
    };
    getPhotos();
  }, [userId]);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h6">Người dùng này chưa có ảnh nào!</Typography>
    );
  }

  return (
    <div className="user-photos-container">
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <CardHeader
            title={`Ngày đăng: ${new Date(photo.date_time).toLocaleString()}`}
          />

          {/* 3. Hiển thị ảnh từ thư mục public/images */}
          <CardMedia
            component="img"
            height="auto"
            image={require(`../../images/${photo.file_name}`)}
            alt={photo.file_name}
          />

          <CardContent>
            <Typography variant="h6">Bình luận:</Typography>
            <Divider style={{ margin: "10px 0" }} />

            {/* 4. Duyệt mảng comments lồng bên trong mỗi bức ảnh */}
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((c) => (
                <div key={c._id} style={{ marginBottom: "10px" }}>
                  <Typography variant="body2">
                    {/* Link đến trang cá nhân của người bình luận */}
                    <Link to={`/users/${c.user_id._id}`}>
                      <strong>
                        {c.user_id.first_name} {c.user_id.last_name}:{" "}
                      </strong>
                    </Link>
                    {c.comment}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(c.date_time).toLocaleString()}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                Chưa có bình luận nào.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
