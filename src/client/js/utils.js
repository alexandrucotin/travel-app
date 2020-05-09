// Get user location and date input on  submit
const getCityAndCountry = () => {
  const country = document.getElementById("inputCountry").value;
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
  console.log(daysLeft);
  return daysLeft;
};

const updateUI = (data) => {
  const response = document.getElementById("response-content");
  response.innerHTML = `<div>
  <h2 class="sub-title">Summary of your trip </h2>
  <div class="trip-info">
  <h4> city: ${data.city} </h4>
  <h4> longitude: ${data.longitude} </h4>
  <h4> latitude: ${data.latitude} </h4>
  <h4> country: ${data.countryName} </h4>
  <h4> trip start: ${data.start} </h4>
  <h4> trip end: ${data.end} </h4>
  <h4> countdown: ${data.countdown} </h4>
  </div>
  </div>`;
};
export { getCityAndCountry, countdown, updateUI, getDates };
