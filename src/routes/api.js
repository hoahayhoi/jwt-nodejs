const express = require('express');
const { createUser, handleLogin, getUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("hello world")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);


module.exports = routerAPI; //export default