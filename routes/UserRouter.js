const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

/**
 * API: /user/list
 * Trả về danh sách rút gọn: _id, first_name, last_name
 */
router.get("/list", async (request, response) => {
  try {
    // Chỉ lấy các trường cần thiết cho sidebar
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    response.status(500).send({ message: "Lỗi hệ thống khi lấy danh sách" });
  }
});

/**
 * API: /user/:id
 * Trả về chi tiết thông tin của 1 user
 */
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const user = await User.findById(id).select(
      "_id first_name last_name location description occupation"
    );

    if (!user) {
      return response
        .status(400)
        .send({ message: "Không tìm thấy người dùng với ID này" });
    }

    response.status(200).send(user);
  } catch (error) {
    // Thường là do ID sai định dạng của MongoDB (CastError)
    response.status(400).send({ message: "ID người dùng không hợp lệ" });
  }
});

module.exports = router;
