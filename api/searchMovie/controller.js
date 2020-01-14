const express = require("express");
const app = express.Router();
const axios = require("axios");

app.get("/:name/:page", async (req, res, err) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=274a6e8e&s=${req.params.name}&page=${
      req.params.page
    }`
  );
  if (response.status === 200) {
    if (response.data) {
      res.status(200).json({
        movies: response.data.Search
      });
    } else {
      res.status(400).json({
        msg: "No movies found"
      });
    }
  } else {
    res.status(400).json({
      msg: "Please try again later"
    });
  }
});

module.exports = app;
