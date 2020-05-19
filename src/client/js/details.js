import {
  weatherComponent,
  sliderComponent,
  sliderControlsComponent,
  modalComponent,
  countryDescriptionComponent,
} from "./components";
import { postRequest } from "./requests";
import {createPdf} from "./utils"

const closeModal = (modalId) => {
  var modal = document.getElementById(modalId);
  var span = document.getElementById("close-modal");
  span.onclick = function () {
    modal.remove();
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.remove();
    }
  };
};

const saveTrip = (modalId) => {
  var span = document.getElementsByClassName("save")[0];
  span.onclick = function () {
    createPdf(modalId)
  };
};


// Show details content
const showTripDetails = (id, trip, type) => {
  if (type === "desktop") {
    modalComponent(trip, id);
    document.getElementById(
      "trip-description"
    ).textContent = countryDescriptionComponent(trip);
    //Append weather forecast
    weatherComponent(trip.weather, `weather-${id}`, trip.start, trip.end);
    //Append slider
    postRequest("http://localhost:8081/images", {
      city: trip.city,
    })
      .then((data) => {
        sliderComponent(`slider-${trip.tripId}`, data);
      })
      .finally(() => {
        sliderControlsComponent();
      });
  } else if (type === "mobile") {
    const tripDescription = document.getElementById(`description-${id}`);
    tripDescription.textContent = countryDescriptionComponent(trip);
  }
};

export { showTripDetails, closeModal,saveTrip };
