import { countdown, insertWeather } from "./utils";
import { sendPicture } from "./requests";

const carousel = () => {
  const slider = document.getElementById("slideshow");
  const carouselImages = document.querySelectorAll(".slider img");

  //buttons
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let counter = 1;
  const size = carouselImages[0].clientWidth;
  slider.style.transform = 'translateX(' + (-size * counter) + 'px)';

  nextButton.addEventListener("click", () => {
    slider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -size * counter + "px)";
  });
  prevButton.addEventListener("click", () => {
    slider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + -size * counter + "px)";
  });

  slider.addEventListener("transitionend", () => {
    if (carouselImages[counter].id === "lastClone") {
      slider.style.transform = "none";
      counter = carouselImages.length - 2;
      slider.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (carouselImages[counter].id === "firstClone") {
      slider.style.transform = "none";
      counter = carouselImages.length - counter;
      slider.style.transform = "translateX(" + -size * counter + "px)";
    }
  });
};

const insertSlideShow = (id, images) => {
  const slider = document.getElementById(id);
  const slideShow = document.createElement("div");
  slideShow.classList.add("slide");
  slideShow.setAttribute("id", "slideshow");
  console.log(images.length);

  //appending the last img of the list to the first position of the slider
  const lastImg = document.createElement("img");
  lastImg.classList.add("img");
  lastImg.setAttribute("src", images[images.length - 1]);
  lastImg.setAttribute("id", "lastClone");
  slideShow.appendChild(lastImg);

  //creating the remaining images
  for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.classList.add("img");
    img.setAttribute("src", images[i]);
    slideShow.appendChild(img);
  }

  //appending the first img of the slider to the last position
  const firstImg = document.createElement("img");
  firstImg.classList.add("img");
  firstImg.setAttribute("src", images[images.length - 1]);
  firstImg.setAttribute("id", "firstClone");
  slideShow.appendChild(firstImg);

  //appending the images to the slider
  slider.appendChild(slideShow);

  carousel();
};


// CREATED MODAL //
const showDetails = (id, trip) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", `modal-${id}`);
  modal.innerHTML = `
    <div class="modal-container">
        <div class="slider" id="slider-${trip.tripId}"></div>
        <button id="prev-button">Prev</button>
        <button id="next-button">Next</button>
        <h1 class="modal-title"> <b>${trip.city}</b> , <b>${
    trip.countryName
  }</b> </h1>
        <div class="modal-content">
          <p class="trip-description"> The trip will start on ${
            trip.start
          } and you will return home on ${trip.end} and it will last for ${
    trip.tripLength
  } days! </p>
          <p class="countdown">departure in ${countdown(trip.start)} days!</p>
          <div class="trip-weather" id="weather-${id}"></div>
        </div>
        <div class="buttons-list">
            <button class="close">close</button>
            <button class="save">save</button>
        </div>
    </div>
    `;
  document.body.appendChild(modal);
  insertWeather(trip.weather, `weather-${id}`, trip.start, trip.end);
  sendPicture("http://localhost:8081/images", {
    city: trip.city,
    countryName: trip.country,
  }).then((data) => {
    insertSlideShow(`slider-${trip.tripId}`, data);
  });
  //
};

const closeModal = (modalId) => {
  var modal = document.getElementById(modalId);
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
