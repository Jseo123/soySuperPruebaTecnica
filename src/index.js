const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

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
