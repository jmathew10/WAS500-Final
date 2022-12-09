const express = require("express");
const port = 3000;
const engines = require("consolidate");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const expressLayouts = require("express-ejs-layouts");
const errorHandler = require("errorhandler");
require("dotenv").config();

// create express app ..................................
const app = express();
const DEFAULT_PORT = 8089;
const MONGODB_URI = process.env.dbURL;

// configure app.settings.............................
app.set("port", process.env.PORT || port);

// set the root view folder
app.set("views", path.join(__dirname, "views"));

// specify desired view engine
app.set("view engine", "ejs");
app.engine("ejs", engines.ejs);

// specify various resources and apply them to our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use(expressLayouts);
app.use(errorHandler()); // load error handler

// import routes
const routes = require("./router");
app.use("/", routes); // load routing

app.use((req, res) => {
  res.status(404).render("404.ejs");
}); // handle page not found errors

// Log every request to the console
app.use((req, res, next) => {
  console.log(
    `${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`
  );
  next();
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "was500" })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(app.get("port"), () => {
      console.log(
        `Express started on http://localhost:${app.get("port")}; press Ctrl-C to terminate.`
      );
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
