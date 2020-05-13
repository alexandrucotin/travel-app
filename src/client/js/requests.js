async function sendGeonames(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function sendWeather(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function sendPicture(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { sendGeonames, sendWeather, sendPicture };
