const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

// 1. Lấy danh sách tất cả ảnh (GET /photos)
router.get("/:id", async (request, response) => {
  const { user_id } = request.params.id;
  try {
    const photos = await Photo.find(user_id);
    response.status(200).json(photos);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// 2. Thêm một ảnh mới (POST /photos)
router.post("/", async (request, response) => {
  try {
    const { file_name, date_time, user_id, comments } = request.body;

    // Tạo instance mới từ model
    const newPhoto = new Photo({
      file_name,
      date_time: date_time || new Date(), // Nếu không gửi date thì lấy hiện tại
      user_id,
      comments: comments || [],
    });

    const savedPhoto = await newPhoto.save();
    response.status(201).json(savedPhoto);
  } catch (error) {
    response.status(400).send({ message: "Không thể lưu ảnh", error });
  }
});

module.exports = router;
