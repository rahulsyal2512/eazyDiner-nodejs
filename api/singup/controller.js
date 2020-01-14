const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const SignupUser = require("./model");
// var validate = require("validate.js");
const checkPhoneNumber = require("../../validate/phoneNumber");
const checkEmail = require("../../validate/email");

// var constraints = {
//   email: {
//     email: {
//       presence: true,
//       message: "is not valid"
//     }
//   }
// };

app.post("", (req, res, next) => {
  let err = [];
  const validateEmail = checkEmail(req.body.email);
  const phoneNumber = checkPhoneNumber(req.body.mobileNumber);
  if (phoneNumber) {
    err.push(phoneNumber);
  }
  if (validateEmail) {
    err.push(validateEmail);
  }
  if (err.length) {
    res.status(200).json({
      msg: err
    });
    return;
  }
  // const validator = validate({ email: req.body.email }, constraints);
  // if (validator.email.length) {
  //   res.status(200).json({
  //     msg: validator.email
  //   });
  //   return;
  // }
  SignupUser.count({ email: req.body.email }, (err, count) => {
    if (count === 0) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        // console.log(req.body);
        let user = new SignupUser({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          mobileNumber: req.body.mobileNumber
        });
        const userSaved = await user.save();
        if (userSaved) {
          res.status(200).json({
            msg: "Signup successfull"
          });
        } else {
          res.status(500).json({
            msg: "Please try again later"
          });
        }
      });
    } else {
      res.status(401).json({
        msg: "Email already exists"
      });
    }
  });
});

module.exports = app;
