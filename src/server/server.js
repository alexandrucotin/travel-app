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

app.post("/countries", getCountries);

async function getCountries(req, res) {
  const countrySend = {};
  const { countryName } = req.body;
  const restcountries = `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`;
  try {
    const response = await axios.get(restcountries);
    if (response) {
      const data = response.data;
      countrySend.flag = data[0].flag;
      countrySend.languages = data[0].languages[0].name;
      countrySend.currencies = data[0].currencies[0].name;
      countrySend.borders = data[0].borders;
      countrySend.timezones = data[0].timezones[0];
      countrySend.population = data[0].population;
      countrySend.region = data[0].region;
      countrySend.capital = data[0].capital;
      console.log(countrySend);
    }
  } catch (error) {
    console.log(error);
  }
  res.send(countrySend);
}

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
    res.send(location);
  } catch (error) {
    res.status(400).json({ error : true, errorMessage: "The city you put in doesn't exists or it isn't in the country you selected!"});
  }
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
          max_temp: max_temp,
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

app.post("/images", getImages);

async function getImages(req, res) {
  const images = [];
  const { city } = req.body;
  const pixabayApi = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city}&image_type=photo&orientation=horizontal`;
  try {
    const response = await axios.get(pixabayApi);
    if (response) {
      for (let i = 0; i < 20; i++) {
        images.push(response.data.hits[i].webformatURL);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.send(images);
}

//starting the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
