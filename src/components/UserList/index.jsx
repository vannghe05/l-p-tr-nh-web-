import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
// 1. Import hàm fetchModel bạn vừa tạo
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  // 2. Khai báo State để chứa danh sách người dùng
  const [users, setUsers] = useState([]);

  // 3. Sử dụng useEffect để gọi API khi Component vừa nạp vào trang web
  useEffect(() => {
    const getUsers = async () => {
      try {
        // Gọi đến API /user/list trên Backend của bạn
        const response = await fetchModel(
          "https://82w65g-8081.csb.app/api/user/list"
        );
        // Cập nhật State với dữ liệu nhận được (response.data)
        setUsers(response.data);
      } catch (error) {
        console.error("Không thể lấy danh sách người dùng:", error);
      }
    };

    getUsers();
  }, []); // Mảng rỗng [] đảm bảo hàm này chỉ chạy 1 lần duy nhất

  return (
    <div className="user-list-container">
      <Typography variant="h6" className="list-title">
        Danh sách người dùng
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              {/* Hiển thị Tên + Họ từ MongoDB */}
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
