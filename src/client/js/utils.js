const displayError = (text) => {
  const error = document.createElement("p");
  error.classList.add("display-error");
  error.textContent = text;
  setTimeout(() => {
    error.parentNode.removeChild(error);
  }, 4000);
  return error;
};

const getCityAndCountry = () => {
  const country = document.getElementById("countries").value;
  const city = document.getElementById("inputCity").value;
  if (country === "destination" || city === "") {
    const status = {
      stutus: false,
      message: "The country or the city are empty!"
    }
    return status;
  } else {
    const destination = {status:true, country: country, city: city, message:"" };
    return destination;
  }
};

const getDates = () => {
  var d = new Date();
  const currentDay = Date.parse(
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  );
  const start = document.getElementById("start-trip").value;
  const end = document.getElementById("end-trip").value;
  if (start === "" || end === "") {
    const status = {
      stutus: false,
      message: "The start day or the end day are empty!"
    }
    return status;
  } else if (Date.parse(start) < currentDay || Date.parse(start) > Date.parse(end)) {
    const status = {
      stutus: false,
      message: "The dates you've choose are selected incorrectly!"
    }
    return status;
  }
  else {
    const dates = { status:true, start: start, end: end, message:"" };
    return dates;
  }
};

const tripLength = (start, end) => {
  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);
  const countdown = tripEnd - tripStart;
  const tripLength = Math.ceil(countdown / 86400000);
  return tripLength;
};

const countdown = (start) => {
  var d = new Date();
  const currentDay = Date.parse(
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  );
  const tripStart = Date.parse(start);
  const countdown = tripStart - currentDay;
  const daysLeft = Math.ceil(countdown / 86400000);
  return daysLeft;
};

const insertWeather = (weatherList, id, dayStart, dayEnd) => {
  const container = document.getElementById(id);
  for (let i = 0; i < weatherList.length; i++) {
    if (
      Date.parse(dayStart) <= Date.parse(weatherList[i].date) &&
      Date.parse(weatherList[i].date) <= Date.parse(dayEnd)
    ) {
      const day = document.createElement("div");
      day.classList.add("day-info");
      const url = require(`../imgs/icons/${weatherList[i].icon}.png`).default;
      day.innerHTML = `
      <p class="date">${weatherList[i].date} </p>
      <img class="weather-icon" src=${url} alt="${weatherList[i].weather}">
      <p class="date">${weatherList[i].weather} </p>
      <div class="temp-list">
        <p class="temp">min <span>${weatherList[i].min_temp}</span></p>
        <p class="temp">max <span>${weatherList[i].max_temp}</span></p>
      </div>`;
      container.appendChild(day);
    }
  }
};

const deleteTrip = (id) => {
  const trip = document.getElementById(id);
  trip.remove();
  console.log("trip deleted!");
};

const updateUI = (trip) => {
  const response = document.getElementById("response-trips");
  const myTrip = document.createElement("div");
  const idWeather = Math.random().toString(36).substring(7);
  myTrip.classList.add("trip-info");
  myTrip.setAttribute("id", trip.tripId);
  myTrip.innerHTML = `
    <div class="trip-details">
      <p class="card-title"> <b>${trip.city}</b> , <b>${
    trip.countryName
  }</b> </p>
      <p class="trip-description"> The trip will start on ${
        trip.start
      } and you will return home on ${trip.end} and it will last for ${
    trip.tripLength
  } days! </p>
      <p class="countdown">departure in ${countdown(trip.start)} days!</p>
    </div>
    <div class="trip-weather" id="${idWeather}"></div>
    <div class="buttons-list">
      <button class="delete"> Delete </button>
      <button class="select"> Select </button>
    </div>`;
  response.appendChild(myTrip);
  insertWeather(trip.weather, idWeather, trip.start, trip.end);
};
export {
  getCityAndCountry,
  tripLength,
  updateUI,
  getDates,
  countdown,
  deleteTrip,
  insertWeather,
  displayError,
};
