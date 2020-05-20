import "regenerator-runtime/runtime";

const request = require("supertest");
const app = require("../server/server");

describe("Post Endpoint to get country infos", () => {
    it("Should return an object with all the info about the country you want to visit", async () => {
      const res = await request(app).post("/countries").send({
        countryName: "Italy",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.countrySend);
    });
  });

describe("Post Endpoint to get location", () => {
  it("should return an object with: latitude, longitude, countryCode and countryName", async () => {
    const res = await request(app).post("/location").send({
      city: "Verona",
      countryCode: "IT",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.location);
  });
});

describe("Post Endpoint to get weather forecast", () => {
  it("should return an array with 16 days (each day as an object part of the array) with their weather forecast for the trip.", async () => {
    const res = await request(app).post("/weather").send({
      latitude: "45.4299",
      longitude: "10.98444",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.weather);
  });
});

describe("Post Endpoint to get images from the city", () => {
    it("should return an array with 20 images with the city you passed as a parameter.", async () => {
      const res = await request(app).post("/images").send({
        city: "Verona"
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.weather);
    });
  });


