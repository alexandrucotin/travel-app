import "./style/general.scss";
import "./style/navbar.scss";
import "./style/landingpage.scss";
import "./style/aboutpage.scss";
import "./style/planpage.scss";
import "./style/footer.scss";

import { getCityAndCountry } from "./js/utils";
import {getGeoLocation} from "./js/requests";


const trip = {};

const handleSearch = async (e) => {
  e.preventDefault();

  const data = getCityAndCountry();
  trip.city = data.city;
  getGeoLocation(data).then(data => {
      trip.longitude = data.longitude
      trip.latitude = data.latitude
      trip.countryCode = data.countryCode
      console.log("this is the promise: ",trip)
  })
};

document.getElementById("submitCity").addEventListener("click", handleSearch);
