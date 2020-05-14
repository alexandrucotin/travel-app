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
      "Select the country you want to visit from all the countries around the world. Then type down the city you want to see.",
  },
  {
    id: "weather",
    title: "Check the weather",
    paragraph:
      "Select the country you want to visit from all the countries around the world. Then type down the city you want to see.",
  },
  {
    id: "pictures",
    title: "See the city",
    paragraph:
      "Select the country you want to visit from all the countries around the world. Then type down the city you want to see.",
  },
  {
    id: "info",
    title: "Discover the info",
    paragraph:
      "Select the country you want to visit from all the countries around the world. Then type down the city you want to see.",
  },
];

const changeContent = (id) => {
  const title = document.getElementById("category-title");
  const description = document.getElementById("category-description");
  const list = document.getElementById("feature-list").children;
  const listItem = document.getElementById(id);
  console.log(list.childElementCount);
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
