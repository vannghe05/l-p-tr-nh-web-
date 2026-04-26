import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Nhớ import hàm này

function UserDetail() {
  const { userId } = useParams();
  // 1. Khởi tạo state user là null
  const [user, setUser] = useState(null);

  // 2. Dùng useEffect để lấy dữ liệu từ Server mỗi khi userId thay đổi
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await fetchModel(`https://82w65g-8081.csb.app/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết người dùng:", error);
      }
    };
    getUserDetail();
  }, [userId]); // Cần [userId] ở đây để khi bấm người khác nó sẽ load lại

  // 3. Hiển thị trạng thái đang tải hoặc không tìm thấy
  if (!user) {
    return (
      <Typography variant="body1">Đang tải dữ liệu người dùng...</Typography>
    );
  }

  return (
    <div className="user-detail-container">
      <Typography variant="h4">
        {user.first_name} {user.last_name}
      </Typography>

      <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </Typography>

      <Typography variant="subtitle1">
        <strong>Địa điểm:</strong> {user.location}
      </Typography>

      <Typography
        variant="body1"
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        {user.description}
      </Typography>

      {/* 4. Nút bấm để xem ảnh của người dùng này */}
      <Button
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
        style={{ marginTop: "20px" }}
      >
        Xem ảnh của {user.first_name}
      </Button>
    </div>
  );
}

export default UserDetail;
