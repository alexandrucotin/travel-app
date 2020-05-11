const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

//express
const app = express();
weather = {};
location = {};

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

//routes

app.get("/", (req, res) => {
  res.sendFiles("dist/index.html");
});

app.post("/location", getLocation);

async function getLocation(req, res) {
  const { city, countryCode } = req.body;
  const geonamesApi = `http://api.geonames.org/searchJSON?formatted=true&name_equals=${city}&country=${countryCode}&username=${process.env.LOCATION_API_KEY}`;
  try {
    const response = await axios.get(geonamesApi);
    if (response) {
      const data = await response.data.geonames[0];
      location.latitude = data.lat;
      location.longitude = data.lng;
      location.countryCode = data.countryCode;
      location.countryName = data.countryName;
    }
  } catch (error) {
    console.log(error);
  }
  console.log("This is location",location);
  res.send(location);
}

app.post("/weather", getWeather);

async function getWeather(req, res) {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude)
  const weatherbitApi = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await axios.get(weatherbitApi);
    if (response) {
      // const data = await response.data.geonames[0];
      // location.latitude = data.lat;
      // location.longitude = data.lng;
      // location.countryCode = data.countryCode;
      // location.countryName = data.countryName;
    }
  } catch (error) {
    console.log(error);
  }
  // console.log("This is weather",location);
  // res.sends(weather);
}

//starting the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
