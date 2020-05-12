// Get user location and date input on  submit
const getCityAndCountry = () => {
  const country = document.getElementById("countries").value;
  const city = document.getElementById("inputCity").value;
  const destination = { country: country, city: city };
  return destination;
};

const getDates = () => {
  const start = document.getElementById("start-trip").value;
  const end = document.getElementById("end-trip").value;
  const dates = { start: start, end: end };
  return dates;
};

const countdown = (start, end) => {
  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);
  const countdown = tripEnd - tripStart;
  const daysLeft = Math.ceil(countdown / 86400000);
  return daysLeft;
};

const insertWeather = (weatherList, tripLength, id) => {
  console.log(tripLength);
  const container = document.getElementById(id);
  for (let i = 0; i < tripLength; i++) {
    const day = document.createElement("div");
    day.classList.add("day-info");
    day.innerHTML = `<p class="date">${weatherList[i].date} </p>
    <img class="weather-icon" src="./src/client/imgs/icons/${weatherList[i].icon}.png" alt="${weatherList[i].weather}">
    <p class="date">${weatherList[i].weather} </p>
    <div class="temp-list">
    <p class="temp">min <span>${weatherList[i].min_temp}</span></p>
    <p class="temp">max <span>${weatherList[i].max_temp}</span></p>
    </div>`;
    container.appendChild(day);
  }
};

const updateUI = (trip) => {
  const response = document.getElementById("response-trips");
  const myTrip = document.createElement("div");
  myTrip.classList.add("trip-info");
  myTrip.innerHTML = `
    <div class="trip-details">
    <p class="card-title"> <b>${trip.city}</b> , <b>${trip.countryName}</b> </p>
    <p class="trip-description"> The trip will start on ${trip.start} and you will return home on ${trip.end} </p>
    <p class="countdown">departure in ${trip.countdown} days!</p>
    </div>
    <div class="trip-weather" id="${trip.city}-${trip.country}">
    </div>
    <button class="button"> Select </button>`;
  response.appendChild(myTrip);
  insertWeather(trip.weather, trip.countdown, `${trip.city}-${trip.country}`);
};
export { getCityAndCountry, countdown, updateUI, getDates };
