import { tripLength, countdown } from "../client/js/utils";

describe("Function to get the trip length", () => {
  it("It should return the number of days the trip will last", () => {
    expect(tripLength("2020-05-21", "2020-05-24")).toBe(3);
  });
});


describe("Function that gives you a countdown to when trip will start", () => {
    it("It should return the number of days left till the trip will start", () => {
      expect(countdown("2020-05-21")).toBe(2);
    });
  });

