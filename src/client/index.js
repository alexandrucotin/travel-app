import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";
import "./style/modal.scss";
import "./style/slider.scss";


import   {
  getCityAndCountry,
  updateUI,
  getDates,
  tripLength,
  deleteTrip,
  loadImgs,
  loadAboutIcons
} from "./js/utils";
import {changeContent} from "./js/about"
import { sendGeonames, sendWeather } from "./js/requests";
import { createSelect, searchCountryCode } from "./js/countries";
import { showDetails, closeModal } from "./js/details";

const trips = [];
let trip = {};



createSelect();

const handleSearch = async (e) => {
  e.preventDefault();
  //trip id
  const idTrip = Math.random().toString(36).substring(7);
  trip.tripId = idTrip;
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
  console.log("Trips:", trips);
};

const handleChoice = async (e) => {
  e.preventDefault();
  const parentId = e.target.parentNode.parentNode.id;
  if (e.target.classList[0] === "delete") {
    for (let i = 0; i < trips.length; i++) {
      if (trips[i].tripId === parentId) {
        trips.splice(i, 1);
      }
    }
    deleteTrip(parentId);
    console.log("Trips after delete: ", trips);
  } else {
    for (let i = 0; i < trips.length; i++) {
      if (trips[i].tripId === parentId) {
        showDetails(parentId, trips[i]);
        closeModal(`modal-${parentId}`);
      }
    }
  }
};

const handleSelection = (e) => {
  e.preventDefault();
  const targetId = e.target.id;
  changeContent(targetId);
}

loadImgs();
loadAboutIcons();
document.getElementById("submitCity").addEventListener("click", handleSearch);
document
  .getElementById("response-trips")
  .addEventListener("click", handleChoice);
document.getElementById("feature-list").addEventListener("click", handleSelection)
