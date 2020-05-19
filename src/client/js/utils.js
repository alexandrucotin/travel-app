import { weatherComponent, buttonsListComponent } from "./components";

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
      placeStutus: false,
      placeMessage: "The country or the city are empty!",
    };
    return status;
  } else {
    const destination = {
      placeStutus: true,
      country: country,
      city: city,
      placeMessage: "",
    };
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
      datesStatus: false,
      datesMessage: "The start day or the end day are empty!",
    };
    return status;
  } else if (
    Date.parse(start) < currentDay ||
    Date.parse(start) > Date.parse(end)
  ) {
    const status = {
      datesStatus: false,
      datesMessage: "The dates you've choose are selected incorrectly!",
    };
    return status;
  } else {
    const dates = {
      datesStatus: true,
      start: start,
      end: end,
      datesMessage: "",
    };
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

const deleteTrip = (id) => {
  const trip = document.getElementById(id);
  trip.remove();
};

const createPdf = (id) => {
  const trip = document.getElementById(id);
  const doc = new jsPDF();
  doc.fromHTML(
    trip,
    15,
    15,
    {
      width: 100,
    },
    function () {
      doc.save("trip.pdf");
    }
  );
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
      <p class="trip-description" id="description-${
        trip.tripId
      }"> The trip will start on ${trip.start} and you will return home on ${
    trip.end
  } and it will last for ${trip.tripLength} days! </p>
      <p class="countdown">departure in ${countdown(trip.start)} days!</p>
    </div>
    <div class="trip-weather" id="${idWeather}"></div>
    <div class="buttons-list">
      ${buttonsListComponent()}
    </div>`;
  response.appendChild(myTrip);
  weatherComponent(trip.weather, idWeather, trip.start, trip.end);
};
export {
  getCityAndCountry,
  getDates,
  tripLength,
  updateUI,
  countdown,
  deleteTrip,
  displayError,
  createPdf,
};
