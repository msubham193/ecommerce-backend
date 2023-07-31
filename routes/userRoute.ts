const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");

const { login, register, logout } = require("../controller/userController");

const router = express.Router();

router.post("/user/register", register);
router.get("/user/login", login);
router.get("/user/logout", logout);

module.exports = router;
