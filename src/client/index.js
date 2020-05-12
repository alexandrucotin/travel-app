import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";

import { getCityAndCountry, updateUI, getDates, tripLength } from "./js/utils";
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
  const length = tripLength(trip.start, trip.end);
  trip.tripLength = length;

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
    })
    .finally(() => {
      sendWeather("http://localhost:8081/weather", {
        latitude: trip.latitude,
        longitude: trip.longitude,
      })
        .then((data) => {
          trip.weather = data;
        })
        .finally(() => {
          trips.push(trip);
          console.log(trip)
          updateUI(trip);
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
