const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/survey", (req, res) => {
  res.render("survey");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/honesty", (req, res) => {
  res.render("honesty");
});

router.use("/", require("./controllers/book.js"));


  
module.exports = router;