// Get user location and date input on  submit
const getCityAndCountry = () => {
  const country = document.getElementById("inputCountry").value;
  const city = document.getElementById("inputCity").value;
  const destination = { country: country, city: city };
  return destination;
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

}
export { getCityAndCountry, countdown,updateUI };
