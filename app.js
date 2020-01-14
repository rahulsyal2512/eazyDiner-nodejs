const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const LoginRouter = require("./api/login/controller");
const SignupRouter = require("./api/singup/controller");
const SearchMovieRouter = require("./api/searchMovie/controller");
const FavouriteRouter = require("./api/favourites/controller");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/eazyDiner", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(_ => {
    console.log("Connection established with database");
  })
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Method", "GET, PUT, DELETE, POST, PATCH");
  next();
});

app.use("/user/login", LoginRouter);
app.use("/user/signup", SignupRouter);
app.use("/user/search", SearchMovieRouter);
app.use("/user/favourites", FavouriteRouter);

module.exports = app;
