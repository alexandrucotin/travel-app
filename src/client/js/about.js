const content = [
  {
    id: "country",
    title: "Countries and Cities",
    paragraph:
      "Select the country you want to visit from all the countries around the world. Then type down the city you want to see.",
  },
  {
    id: "date",
    title: "Trip length",
    paragraph:
      "Choose the day you want to leave and the day you want to come back. The day you want to leave can't be a day previous the current day",
  },
  {
    id: "weather",
    title: "Check the weather",
    paragraph:
      "After you've choosed the country, city and the dates, just press search and you'll get the forecast for the days of your trip. Keep in mind that we are able to provide only 16 days from today. After that you won't get nothing!",
  },
  {
    id: "pictures",
    title: "See the city",
    paragraph:
      "You will get a small card. Press select and a modal will show up! In that modal will be present a slideshow with the city you have selected before.",
  },
  {
    id: "info",
    title: "Discover the info",
    paragraph:
      "In the modal there will be also some information about the country you will visit like the timezone, the region the country is, the main language and the currency.",
  },
];

const changeContent = (id) => {
  const title = document.getElementById("category-title");
  const description = document.getElementById("category-description");
  const list = document.getElementById("feature-list").children;
  const listItem = document.getElementById(id);
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("active")) {
      list[i].classList.remove("active");
    }
    if (content[i].id === id) {
      title.textContent = content[i].title;
      description.textContent = content[i].paragraph;
    }
  }
  listItem.classList.add("active");
};
export { changeContent };
