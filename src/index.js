const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const crawler = require("./crawler/crawler");
const app = express();
dotenv.config();

// config
app.set("port", process.env.PORT || 4000);

//middleware
app.use(morgan("dev"));

//routes

app.use(require("./routes/index"));

//run server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

module.exports = app;
