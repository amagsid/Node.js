//getting NPM packages
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

//parsing requests as JSON
app.use(express.json());

//route for the GET request
app.get("/", (req, res) => {
  res.render("index");
});

//route for the POST request
app.post("/weather", (req, res) => {
  if (isInvalidReq(req)) {
    res.send("invalid/bad request");
    res.status(400);
  } else {
    const cityName = req.body.cityName;
    res.setHeader("content-type", "application/json");
    res.send(cityName);
    res.status(200);
  }
});

//reusuable function to detect bad requests
function isInvalidReq(req) {
  if (!req.body.cityName) {
    return true;
  } else {
    false;
  }
}

app.listen(3000, () => console.log("Server started"));
