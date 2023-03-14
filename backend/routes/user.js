const express = require("express");
const router = express.Router();
const { loginMethod, signUpMethod } = require("../controllers/userController");

//login
router.post("/login", loginMethod);

//signup
router.post("/signup", signUpMethod);

module.exports = router;
