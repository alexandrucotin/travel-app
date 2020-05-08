function submit() {
  const button = document.getElementById("submitCity");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ZAOOOO");
  });
}

window.submit = submit;

export { submit };
