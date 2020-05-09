const geonamesKey = "a.cotin96";

async function getGeoLocation(city, countryCode) {
  const geonamesApi = `http://api.geonames.org/searchJSON?formatted=true&q=${city}&country=${countryCode}&username=a.cotin96&style=full`;
  console.log(geonamesApi);
  try {
    const response = await fetch(geonamesApi);
    if (response.ok) {
      const location = {};
      const jsonRes = await response.json();
      location.latitude = jsonRes.geonames[0].lat;
      location.longitude = jsonRes.geonames[0].lng;
      location.countryCode = jsonRes.geonames[0].countryCode;
      location.countryName = jsonRes.geonames[0].countryName;
      console.log(location);
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

export { getGeoLocation };
