const express = require('express');
const app = express();

const models = require('./src/modelData/models.js').models;


app.get('/user/list', function (request, response) {
    const userList = models.userListModel();
    response.status(200).send(userList);
});


app.get('/user/:id', function (request, response) {
    const id = request.params.id;
    const user = models.userModel(id);
    if (!user) {
        response.status(400).send('Không tìm thấy user');
        return;
    }
    response.status(200).send(user);
});


app.get('/photosOfUser/:id', function (request, response) {
    const id = request.params.id;
    const photos = models.photoOfUserModel(id);
    if (!photos) {
        response.status(400).send('Không tìm thấy ảnh');
        return;
    }
    response.status(200).send(photos);
});


const server = app.listen(3000, function () {
    console.log('Backend đang chạy tại http://localhost:3000');
});