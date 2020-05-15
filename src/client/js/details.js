import { countdown, insertWeather } from "./utils";
import { sendPicture } from "./requests";

const carousel = () => {
  const container = document.querySelector(".slider-container");
  const slider = container.querySelector(".slider-container-sliders");
  const sliderImages = container.querySelectorAll(
    ".slider-container-sliders img"
  );
  const prevButton = document.querySelector("#prev-button");
  const nextButton = document.querySelector("#next-button");
  let counter = 1;
  console.log("slider images: ", sliderImages[0].clientWidth);
  let width = 0
  sliderImages[0].onload = () => {
    width = sliderImages[0].width;
    console.log("The width is: ",width);
  }
  slider.style.transform = "translateX(" + -width * counter + "px)";

  nextButton.addEventListener("click", () => {
    console.log("Next button was pressed")
    if (counter >= sliderImages.length - 1) return;
    slider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -width * counter + "px)";
  });

  prevButton.addEventListener("click", () => {
    console.log("Prev button was pressed")
    if (counter <= 0) return;
    slider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
  });

  slider.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - 2;
      console.log(counter);
      slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
    }
    if (sliderImages[counter].id === "firstClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - counter;
      console.log(counter);
      slider.style.transform = "translateX(" + `${-width * counter}` + "px)";
    }
  });
};

const createSlider = (id, images) => {
  const sliderContainer = document.getElementById(id);
  const slideShow = document.createElement("div");
  slideShow.classList.add("slider-container-sliders");
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
  firstImg.setAttribute("src", images[0]);
  firstImg.setAttribute("id", "firstClone");
  slideShow.appendChild(firstImg);

  //appending the images to the slider
  sliderContainer.appendChild(slideShow);
};

// CREATED MODAL //
const showDetails = (id, trip) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", `modal-${id}`);
  modal.innerHTML = `
    <div class="modal-container">
        <div class="slider-container" id="slider-${trip.tripId}"></div>
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
            <button class="delete">close</button>
            <button class="select">save</button>
        </div>
    </div>
    `;
  document.body.appendChild(modal);
  insertWeather(trip.weather, `weather-${id}`, trip.start, trip.end);
  sendPicture("http://localhost:8081/images", {
    city: trip.city,
    countryName: trip.country,
  })
    .then((data) => {
      createSlider(`slider-${trip.tripId}`, data);
    })
    .finally(() => {
      carousel();
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
