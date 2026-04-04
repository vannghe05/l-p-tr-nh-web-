import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserList () {
    const users = models.userListModel();
    return (
    <div className="user-list-container">
      <h3 className="list-title">Danh sách người dùng</h3>
      <ul className="user-ul">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <li className="user-li">
              <Link to={`/users/${item._id}`} className="user-link">
                {item.first_name}
              </Link>
            </li>
            <hr className="user-divider" />
          </React.Fragment>
        ))}
      </ul>

      <p className="footer-text">
        Dữ liệu lấy từ models.userListModel()
      </p>
    </div>
  );
}

export default UserList;
