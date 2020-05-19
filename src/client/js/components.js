import { countdown } from "./utils";

const weatherComponent = (weatherList, id, dayStart, dayEnd) => {
  const container = document.getElementById(id);
  for (let i = 0; i < weatherList.length; i++) {
    if (
      Date.parse(dayStart) <= Date.parse(weatherList[i].date) &&
      Date.parse(weatherList[i].date) <= Date.parse(dayEnd)
    ) {
      const day = document.createElement("div");
      day.classList.add("day-info");
      const url = require(`../imgs/icons/${weatherList[i].icon}.png`).default;
      day.innerHTML = `
        <p class="date">${weatherList[i].date} </p>
        <img class="weather-icon" src=${url} alt="${weatherList[i].weather}">
        <p class="date">${weatherList[i].weather} </p>
        <div class="temp-list">
          <p class="temp">min <span>${weatherList[i].min_temp}</span></p>
          <p class="temp">max <span>${weatherList[i].max_temp}</span></p>
        </div>`;
      container.appendChild(day);
    }
  }
};

const buttonsListComponent = () => {
  let buttons = "";
  if (window.screen.width <= 1024) {
    buttons = `<button class="delete"> Delete </button>
      <button class="show-more"> Show more </button>
      <button class="select"> Save </button>`;
  } else {
    buttons = `<button class="delete"> Delete </button>
      <button class="select"> Select </button>`;
  }
  return buttons;
};

//Function that appends all the images fetched from the PIXABAY api
const sliderComponent = (id, images) => {
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

// Function that enable the controls for the slider (prev/next slide)
const sliderControlsComponent = () => {
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

const modalComponent = (trip, id) => {
  const modal = document.createElement("div");
  // const flagUrl = require(trip.countryInfo.flag).default;
  modal.classList.add("modal");
  modal.setAttribute("id", `modal-${id}`);
  modal.innerHTML = `<div class="modal-container">
        <div class="slider-container" id="slider-${trip.tripId}">
        <span id="prev-button" class="leftBtn"></span>
        <span id="next-button" class="rightBtn"></span></div>
      <div class="modal-full">
        <h1 class="modal-title">
          ${trip.city},${trip.countryName}
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
};

const countryDescriptionComponent = (trip) => {
    const description = `${trip.countryName} is a country in ${
      trip.countryInfo.region
    }. The
      timezone there is ${trip.countryInfo.timezones} and the population
      speaks ${trip.countryInfo.languages}. This country also borders with
      ${trip.countryInfo.borders} and the main currency is
      ${trip.countryInfo.currencies}.The current population of
      ${trip.countryName} is ${trip.countryInfo.population} and the capital of
      the country is ${trip.countryInfo.capital}. The capital of
      ${trip.countryName} is ${trip.countryInfo.capital} and the currencie
      there is the ${trip.countryInfo.currencies}.The trip will start on
      ${trip.start} and will end ${trip.tripLength} days later, on
      ${trip.end}.`;
    return description;
  };

export {
  weatherComponent,
  buttonsListComponent,
  sliderComponent,
  sliderControlsComponent,
  modalComponent,
  countryDescriptionComponent
};
