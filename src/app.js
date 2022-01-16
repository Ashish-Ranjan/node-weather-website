const path = require("path");
const express = require("express");
const hbs = require("hbs");
const dotenv = require('dotenv');
dotenv.config();
const { geoCode } = require("./utils/geocode");
const { forCast } = require("./utils/forcast");

const app = express();
const PORT = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ashish Ranjan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    imgSrc: "./img/image.png",
    name: "Ashish Ranjan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is a help page and will provide you all the help",
    name: "Ashish Ranjan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term",
    });
  }
  const place = req.query.address;
  geoCode(place, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forCast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        location,
        forcast: forcastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Ashish Ranjan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found!",
    name: "Ashish Ranjan",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port. ${PORT}`);
});
