const express = require("express");
const app = express.Router();
const FavouriteRouter = require("./model");
const AuthenticateRequest = require("../../authenticate");

app.get("", AuthenticateRequest, async (req, res, err) => {
  const movies = await FavouriteRouter.find({ userId: req.userInfo.userId });
  if (movies.length) {
    res.status(200).json({
      movies: movies
    });
  } else {
    res.status(400).json({
      msg: "No favourites"
    });
  }
});

app.post("/add", AuthenticateRequest, (req, res, err) => {
  const movie = new FavouriteRouter({
    title: req.body.title,
    userId: req.userInfo.userId
  });
  FavouriteRouter.count({ title: req.body.title }, async (err, count) => {
    if (count === 0) {
      const result = await movie.save();
      if (result) {
        res.status(200).json({
          msg: "Added to your favourites"
        });
      } else {
        res.status(200).json({
          msg: "Please try again later"
        });
      }
    } else {
      res.status(200).json({
        msg: "Movie is already added to your favourites"
      });
    }
  });
});

app.put("/update/:id", AuthenticateRequest, async (req, res, err) => {
  const result = await FavouriteRouter.findOneAndUpdate(
    { _id: req.params.id, userId: req.userInfo.userId },
    { $set: { title: req.body.title } }
  );
  if (result) {
    res.status(200).json({
      msg: "Update successfull"
    });
  } else {
    res.status(200).json({
      msg: "Please login again to update!"
    });
  }
});

app.delete("/remove/:id", AuthenticateRequest, async (req, res, err) => {
  const removed = await FavouriteRouter.findOneAndRemove({
    _id: req.params.id,
    userId: req.userInfo.userId
  });
  if (removed) {
    res.status(200).json({
      msg: "Removed successfully"
    });
  } else {
    res.status(200).json({
      msg: "Please login again to continue!"
    });
  }
});

module.exports = app;
