import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";

import { getCityAndCountry, updateUI, getDates,countdown } from "./js/utils";
import { getGeoLocation } from "./js/requests";

const trip = {};

const handleSearch = async (e) => {
  e.preventDefault();
  const dates = getDates();
  trip.end = dates.end;
  trip.start = dates.start;
  const countDown = countdown(trip.start, trip.end)
  const data = getCityAndCountry();
  trip.city = data.city;

  trip.countdown = countDown;
  getGeoLocation(data)
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
