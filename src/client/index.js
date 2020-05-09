import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";

import { getCityAndCountry, updateUI, getDates,countdown } from "./js/utils";
import { getGeoLocation } from "./js/requests";
import {createSelect, searchCountryCode} from "./js/countries";


const trip = {};

createSelect();

const handleSearch = async (e) => {
  e.preventDefault();

  //gets dates
  const dates = getDates();
  trip.end = dates.end;
  trip.start = dates.start;

  //countdown
  const countDown = countdown(trip.start, trip.end)
  trip.countdown = countDown;

  //get city and country
  const data = getCityAndCountry();
  trip.city = data.city;
  trip.country = data.country;

  //add country code to trip
  const countryCode = searchCountryCode(trip.country);
  trip.countryCode = countryCode;

  console.log(trip);

  getGeoLocation(trip.city, trip.countryCode)
    .then((data) => {
      trip.longitude = data.longitude;
      trip.latitude = data.latitude;
      trip.countryName = data.countryName;
    })
    .then(() => {
      updateUI(trip);
    });
};

document.getElementById("submitCity").addEventListener("click", handleSearch);
