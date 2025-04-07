const express = require("express");
const { register, login, dashboard, logout, changePassword} = require("../controller/authController");``
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", dashboard);
router.get("/logout", logout);
router.post("/change-password", changePassword);

module.exports = router;