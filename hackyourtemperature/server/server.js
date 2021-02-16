//I went a for the extra mile with the project for this week since I wanted to expirement more with handlebars and serving files from the public folder.

//NPM packages
const express = require("express");
const exhbs = require("express-handlebars");
const axios = require("axios");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
//global packages
const path = require("path");
//intitialting express
const app = express();

const API_KEY = require("../sources/keys.json");

//for URL-encoded bodies
app.use(express.urlencoded());

//serve static dir
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

app.engine(
  "handlebars",
  exhbs({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../views/layouts/"),
    partialsDir: path.join(__dirname, "../views/partials/"),
  })
);
app.set("view engine", "handlebars");

//route for the GET request
app.get("/", (req, res) => {
  res.render("index");
});

//route for the POST request
app.post("/weather", async (req, res) => {
  const cityInput = req.body.cityName;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&APPID=${API_KEY}`
  );
  const data = await response.json();

  if (data.cod == 404) {
    return res.render("index", {
      weatherText: "City is not found! Please enter a valid city name.",
      error: data.cod,
    });
  }

  const { temp, feels_like, temp_min, temp_max } = data.main;
  const condition = data.weather[0].main;

  res.status(200);
  res.render("index", {
    cityInput: cityInput[0].toUpperCase() + cityInput.slice(1),
    weatherText: `Currently it's ${Math.round(
      temp
    )}° and feels like ${Math.round(
      feels_like
    )}°. The high today is ${Math.round(temp_max)}° with a low of ${Math.round(
      temp_min
    )}°`,
    condition,
  });
  // res.setHeader("content-type", "application/json");
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
