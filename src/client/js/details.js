import { countdown } from "./utils";

const showDetails = (id, trip) => {
  console.log(
    "THOSE ARE THE DETAILS FOR THE TRIP THAT YOU HAVE SELECTED:",
    trip
  );
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", `modal-${id}`);
  modal.innerHTML = `
    <!-- Modal content -->
    <div class="modal-content">
    <div class="slider"></div>
      <p class="card-title"> <b>${trip.city}</b> , <b>${
    trip.countryName
  }</b> </p>
      <p class="trip-description"> The trip will start on ${
        trip.start
      } and you will return home on ${trip.end} and it will last for ${
    trip.tripLength
  } days! </p>
      <p class="countdown">departure in ${countdown(trip.start)} days!</p>
      
      <div class="trip-weather" id="">
      </div>
      <div class="buttons-list">
      <button class="close"> close </button>
      <button class="select"> save </button>
    </div>
    </div>
    `;
  document.body.appendChild(modal);
};

const closeModal = (modaId) => {
  var modal = document.getElementById(modaId);
  var span = document.getElementsByClassName("close")[0];
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

export { showDetails, closeModal };
