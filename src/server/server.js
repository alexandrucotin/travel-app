const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

//express
const app = express();

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
  const location = {};
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
  res.send(location);
}

app.post("/weather", getWeather);

async function getWeather(req, res) {
  const weather = [];
  const { latitude, longitude } = req.body;
  const weatherbitApi = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await axios.get(weatherbitApi);
    if (response) {
      let day = {};
      for (let i = 0; i < response.data.data.length; i++) {
        const date = response.data.data[i].datetime;
        const min_temp = response.data.data[i].min_temp;
        const max_temp = response.data.data[i].max_temp;
        const weatherDescription = response.data.data[i].weather.description;
        const weatherIcon = response.data.data[i].weather.icon;
        day = {
          date: date,
          weather: weatherDescription,
          icon: weatherIcon,
          min_temp: min_temp,
          max_temp: max_temp
        };
        weather.push(day);
        day = {};
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.send(weather);
}

//starting the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
