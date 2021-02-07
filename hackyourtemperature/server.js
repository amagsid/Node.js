const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("hello from backend to frontend!");
});

app.listen(3000);
