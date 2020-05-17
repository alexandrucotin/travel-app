import { countdown, insertWeather } from "./utils";
import { sendPicture } from "./requests";

// Function that enable the controls for the slider (prev/next slide)
const sliderControls = () => {
  const container = document.querySelector(".slider-container");
  const slider = container.querySelector(".slider-container-sliders");
  const sliderImages = container.querySelectorAll(
    ".slider-container-sliders img"
  );
  const prevButton = document.querySelector("#prev-button");
  const nextButton = document.querySelector("#next-button");
  let counter = 1;
  let width = 0;
  sliderImages[0].onload = () => {
    width = sliderImages[0].width;
  };
  slider.style.transform = "translateX(" + -width * counter + "px)";

  nextButton.addEventListener("click", () => {
    console.log("Next button was pressed");
    if (counter >= sliderImages.length - 1) return;
    slider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -width * counter + "px)";
  });

  prevButton.addEventListener("click", () => {
    console.log("Prev button was pressed");
    if (counter <= 0) return;
    slider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
  });

  slider.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - 2;
      slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
    }
    if (sliderImages[counter].id === "firstClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - counter;
      slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
    }
  });
};

//Function that appends all the images fetched from the PIXABAY api
const createSlider = (id, images) => {
  const sliderContainer = document.getElementById(id);
  const slideShow = document.createElement("div");
  slideShow.classList.add("slider-container-sliders");
  slideShow.setAttribute("id", "slideshow");

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
  firstImg.setAttribute("src", images[0]);
  firstImg.setAttribute("id", "firstClone");
  slideShow.appendChild(firstImg);

  //appending the images to the slider
  sliderContainer.appendChild(slideShow);
};

const getBorders = (bordersList) => {
  return bordersList;
};

// CREATED MODAL //
const showDetails = (id, trip) => {
  const modal = document.createElement("div");
  // const flagUrl = require(trip.countryInfo.flag).default;
  modal.classList.add("modal");
  modal.setAttribute("id", `modal-${id}`);
  console.log("the flag is: ", trip.countryInfo.flag);
  modal.innerHTML = `<div class="modal-container">
    <div class="slider-container" id="slider-${trip.tripId}">
    <span id="prev-button" class="leftBtn"></span>
    <span id="next-button" class="rightBtn"></span></div>
  <div class="modal-full">
    <h1 class="modal-title">
      ${trip.city},${trip.countryName}<span id="countryFlag"></span>
    </h1>
    <div class="modal-content">
      <h2 class="modal-subtitle">Some info</h2>
      <p class="trip-description" id="trip-description">
      </p>
      <p class="countdown">departure in ${countdown(trip.start)} days!</p>
      <div class="trip-weather" id="weather-${id}"></div>
    </div>
    <div class="buttons-list">
      <button class="delete" id="close-modal">close</button>
      <button class="select">save</button>
    </div>
  </div>
</div>`;

  //append modal to the body
  document.body.appendChild(modal);

  //Insert country description into modal
  document.getElementById("trip-description").textContent = 
  `${trip.countryName} is a country in ${trip.countryInfo.region}. The
  timezone there is ${trip.countryInfo.timezones} and the population
  speaks ${trip.countryInfo.languages}. This country also borders with
  ${getBorders(trip.countryInfo.borders)} and the main currency is
  ${trip.countryInfo.currencies}.The current population of
  ${trip.countryName} is ${trip.countryInfo.population} and the capital of
  the country is ${trip.countryInfo.capital}. The capital of
  ${trip.countryName} is ${trip.countryInfo.capital} and the currencie
  there is the ${trip.countryInfo.currencies}.The trip will start on
  ${trip.start} and will end ${trip.tripLength} days later, on
  ${trip.end}.`;

  //Append weather forecast
  insertWeather(trip.weather, `weather-${id}`, trip.start, trip.end);

  //Append slider
  sendPicture("http://localhost:8081/images", {
    city: trip.city,
  })
    .then((data) => {
      createSlider(`slider-${trip.tripId}`, data);
    })
    .finally(() => {
      sliderControls();
    });
  //
};

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

export { showDetails, closeModal };
