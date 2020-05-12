import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";

import { getCityAndCountry, updateUI, getDates, countdown } from "./js/utils";
import { sendGeonames, sendWeather } from "./js/requests";
import { createSelect, searchCountryCode } from "./js/countries";

const trips = [];
let trip = {};

createSelect();

const handleSearch = async (e) => {
  e.preventDefault();

  //gets dates
  const dates = getDates();
  trip.end = dates.end;
  trip.start = dates.start;

  //countdown
  const countDown = countdown(trip.start, trip.end);
  trip.countdown = countDown;

  //get city and country
  const data = getCityAndCountry();
  trip.city = data.city;
  trip.country = data.country;

  //add country code to trip
  const countryCode = searchCountryCode(trip.country);
  trip.countryCode = countryCode;

  sendGeonames("http://localhost:8081/location", {
    city: trip.city,
    countryCode: trip.countryCode,
  })
    .then((data) => {
      trip.longitude = data.longitude;
      trip.latitude = data.latitude;
      trip.countryName = data.countryName;
      console.log("Location trip is: ", trip);
    })
    .finally(() => {
      sendWeather("http://localhost:8081/weather", {
        latitude: trip.latitude,
        longitude: trip.longitude,
      })
        .then((data) => {
          trip.weather = data;
          console.log("weather trip is: ", trip);
        })
        .finally(() => {
          trips.push(trip);
          console.log("List of trips is: ", trips);
          updateUI(trips[0]);
          trip = {};
        })
        .catch((err) => {
          console.log("the error is : ", err);
        });
    })
    .catch((err) => {
      console.log("the error is : ", err);
    });
};

document.getElementById("submitCity").addEventListener("click", handleSearch);
