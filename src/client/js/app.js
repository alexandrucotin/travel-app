(function () {
  const button = document.getElementById("submitCity");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.getElementById("inputCity").value;
    const country = document.getElementById("inputCountry").value;
    getDataFromApi(city, country).then((data) => {
      const element = {
        lat: data.geonames[0].lat,
        lng: data.geonames[0].lng,
      };
      postData("http://localhost:8081/data", element);
    });
  });
})();

//get data from api
const getDataFromApi = async (city, country) => {
  const url = `http://api.geonames.org/searchJSON?name_equals=${city}&country=${country}&maxRows=1&username=a.cotin96`;
  const res = await fetch(url);
  //changed to celcius (im from Italy)
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const postData = async (url = "", data = {}) => {
    console.log("data that IS in postData: ", data);
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };