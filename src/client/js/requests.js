const geonamesKey = "a.cotin96";

async function sendLocation(url="", data={}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { sendLocation };
