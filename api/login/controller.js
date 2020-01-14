const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
// const LoginUser = require("./model");
const SignupUser = require("../singup/model");
const jwt = require("jsonwebtoken");
const checkEmail = require("../../validate/email");

app.post("", async (req, res, err) => {
  const validateEmail = checkEmail(req.body.email);
  if (validateEmail) {
    res.status(400).json({
      msg: validateEmail
    });
    return;
  }
  const user = await SignupUser.findOne({ email: req.body.email });
  if (user) {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (checkPassword) {
      jwt.sign(
        { email: user.email, user: user._id },
        "Salt should be long",
        {
          expiresIn: "1h"
        },
        function(err, token) {
          console.log(token);
          res.status(200).json({
            msg: "Login Successfull",
            token: token
          });
        }
      );
    } else {
      res.status(422).json({
        msg: -1,
        content: "Password does not match"
      });
    }
  } else {
    res.status(400).json({
      msg: "User does not exist"
    });
  }
});

module.exports = app;
