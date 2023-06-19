const express = require("express");
const router = express.Router()
const cors= require("cors")
const {test,registerUser,loginUser, getProfile, logout} = require("../controllers/authControllers")


// middleware

router.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
// http://localhost

router.get("/", test);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", getProfile)

router.post("/logout", logout)

module.exports = router;