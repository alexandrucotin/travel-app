import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";
import "./style/modal.scss";
import "./style/slider.scss";

import { loadLandingpageImgs, loadAboutIcons } from "./js/loadImgs";

import {
  getCityAndCountry,
  updateUI,
  getDates,
  tripLength,
  deleteTrip,
  displayError,
} from "./js/utils";
import { changeContent } from "./js/about";
import { postRequest } from "./js/requests";
import { createSelect, searchCountryCode } from "./js/countries";
import { showDetails, closeModal } from "./js/details";

const trips = [];
let trip = {};

createSelect();

const handleSearch = async (e) => {
  e.preventDefault();
  //Added trip id
  const idTrip = Math.random().toString(36).substring(7);
  trip.tripId = idTrip;
  //Added city and country
  const place = getCityAndCountry();
  trip.city = place.city;
  trip.country = place.country;
  //Added trip dates
  const dates = getDates();
  trip.end = dates.end;
  trip.start = dates.start;
  //countdown
  const length = tripLength(trip.start, trip.end);
  trip.tripLength = length;
  //add country code to trip
  const countryCode = searchCountryCode(trip.country);
  trip.countryCode = countryCode;
  if (!place.status || !dates.status) {
    const searchBox = document.getElementById("search-box");
    const errorMessage = displayError(`${place.message} ${dates.message}`);
    searchBox.appendChild(errorMessage);
  } else {
    postRequest("http://localhost:8081/location", {
      city: trip.city,
      countryCode: trip.countryCode,
    })
      .then((data) => {
        if (data.error) {
          const searchBox = document.getElementById("search-box");
          const errorMessage = displayError(data.errorMessage);
          searchBox.appendChild(errorMessage);
        } else {
          trip.longitude = data.longitude;
          trip.latitude = data.latitude;
          trip.countryName = data.countryName;
          postRequest("http://localhost:8081/weather", {
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
        }
      })
      .catch((error) => {
        console.log("GEONAMES ERROR : ", error);
      });
  }
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
        console.log("the trip is: ", trips[i]);
        postRequest("http://localhost:8081/countries", {
          countryName: trips[i].countryName,
        }).then((data) => {
          trips[i].countryInfo = data;
          console.log(trips[i]);
          const screenSize = window.screen.width;
          if (screenSize > 0 && screenSize <= 550) {
            console.log(parentId);
            showDetails(parentId, trips[i], "mobile");
          } else if (screenSize > 550 && screenSize <= 1024) {
            console.log("ZAOOO Schermo tablet")
            showDetails(parentId, trips[i], "tablet");
          } else {

            console.log("ZAOOO Schermo desktop")
            showDetails(parentId, trips[i], "desktop");
            closeModal(`modal-${parentId}`);
          }
        });
      }
    }
  }
};

const handleSelection = (e) => {
  e.preventDefault();
  const targetId = e.target.id;
  changeContent(targetId);
};

loadLandingpageImgs();
loadAboutIcons();
document.getElementById("submitCity").addEventListener("click", handleSearch);
document
  .getElementById("response-trips")
  .addEventListener("click", handleChoice);
document
  .getElementById("feature-list")
  .addEventListener("click", handleSelection);
