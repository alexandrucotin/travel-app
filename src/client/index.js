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
import { showTripDetails, closeModal } from "./js/details";

const trips = [];
let trip = {};

//Handle for search button
const handleSearch = async (e) => {
  e.preventDefault();
  //Added trip info
  const idTrip = Math.random().toString(36).substring(7);
  const { city, country, placeStutus } = getCityAndCountry();
  const { start, end, datesStatus } = getDates();
  const length = tripLength(start, end);
  const countryCode = searchCountryCode(country);
  trip = {
    tripId: idTrip,
    country: country,
    countryCode: countryCode,
    city: city,
    start: start,
    end: end,
    tripLength: length,
  };
  if (!placeStutus || !datesStatus) {
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

//Handle for buttons choices
const handleChoice = async (e) => {
  e.preventDefault();
  const screenSize = window.screen.width;
  const parentId = e.target.parentNode.parentNode.id;
  switch (e.target.classList[0]) {
    case "delete":
      for (let i = 0; i < trips.length; i++) {
        if (trips[i].tripId === parentId) {
          trips.splice(i, 1);
        }
      }
      deleteTrip(parentId);
      break;
    case "select":
      if (screenSize > 1024) {
        for (let i = 0; i < trips.length; i++) {
          if (trips[i].tripId === parentId) {
            postRequest("http://localhost:8081/countries", {
              countryName: trips[i].countryName,
            }).then((data) => {
              trips[i].countryInfo = data;
              console.log(trips[i]);
              showTripDetails(parentId, trips[i], "desktop");
              closeModal(`modal-${parentId}`);
            });
          }
        }
      } else {
        console.log("Mobile select!");
      }
      break;
    case "show-more":
      for (let i = 0; i < trips.length; i++) {
        if (trips[i].tripId === parentId) {
          postRequest("http://localhost:8081/countries", {
            countryName: trips[i].countryName,
          }).then((data) => {
            trips[i].countryInfo = data;
            console.log(trips[i]);
            showTripDetails(parentId, trips[i], "mobile");
          });
        }
      }
  }
};

//Change content on about section
const handleSelection = (e) => {
  e.preventDefault();
  const targetId = e.target.id;
  changeContent(targetId);
};


//Loading static images
loadLandingpageImgs();
loadAboutIcons();
//Loading the countries list on Country dropdown
createSelect();

//EventListeners for buttons
document.getElementById("submitCity").addEventListener("click", handleSearch);
document
  .getElementById("response-trips")
  .addEventListener("click", handleChoice);
document
  .getElementById("feature-list")
  .addEventListener("click", handleSelection);
