const app = require("./server");
//run server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

module.exports = app;
