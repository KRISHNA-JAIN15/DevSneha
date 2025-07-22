const express = require("express");
const { checkForAuthenticationCookie } = require("../middleware/auth");

const { getSignin, getSignup, postSignup, postSignin, logout , getMe} = require("../controller/user");

const router = express.Router();

router.get("/signin", getSignin);
router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/logout", logout);
router.get("/me", checkForAuthenticationCookie("token"), getMe);

module.exports = router;