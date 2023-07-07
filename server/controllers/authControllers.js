const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // name check
    if (!name) {
      return res.json({ error: "name is required" });
    }
    // password check
    if (!password || password < 6) {
      return res.json({
        error: "password is required and it shold b more thn 6 char length",
      });
    }

    const salt = await bcrypt.genSalt(10);
    let hashed_password = await bcrypt.hash(password.toString(), salt);
    // email check

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "email already taken" });
    }

    const user = await User.create({
      name,
      email,
      password: hashed_password,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exist
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ error: "you are not registered" });
    }

    // console.log("req pass:",password);
    // console.log("db pass:",user.password);
    // //////////
    let db_password = user.password;
    //matching password
    const isValid = await bcrypt.compare(password.toString(), db_password);

    //taking action for incorrect password
    if (!isValid) {
      // return res.send("Incorrect Password")
      res.json({ error: "password do not match" });
    }

    //generate token
    // const token_to_send = jwt.sign({ id: user._id }, "mySecretKey", { expiresIn: '1h' })

    jwt.sign({ id: user._id , name:user.name }, process.env.JWT_SEC, {}, (err, token) => {
      if (err) throw err;
      res.cookie("newtoken", token).json(user);
      // console.log("toekn:",token);
    });

    // res.cookie('token', token_to_send).json(user)

    // //////////

    // ---------------
  } catch (error) {
    console.log(error);
  }
  // ----------------
};

const getProfile = (req, res) => {
  const { newtoken } = req.cookies;
  // console.log("token from verify", newtoken);

  jwt.verify(newtoken, process.env.JWT_SEC, {}, (err, index) => {
    if (err) throw err;
    res.json(index);
  });
};


const logout = (req,res)=> {
    res.clearCookie('newtoken').json({message:"logout suc"})
}

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout
};
