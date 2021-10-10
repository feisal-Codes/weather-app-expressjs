const request = require("request");
// const key = "720267ca09b6255716587b509c705271";

const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1IjoiZmVpc2FsbWliIiwiYSI6ImNrdHkwa2JieDJ5bjEyb21wdHIycDR1a2oifQ.ip60QLywCxcV3KLMimywcQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Failed to connect, please check your internet connection",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("Location not found , try another search!", undefined);
    } else {
      const cardinals = response.body.features[0].center;
      const location =response.body.features[0].place_name;
      const [longtitude, latitude] = cardinals;

      callback(undefined, { longtitude: longtitude, latitude: latitude, location:location });
    }
  });
};

const forecast = (latitude, longtitude, callback) => {
  const accessKey = "ca588593c7ed4d6147d3a4bc50ba0ff2";

  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude}, ${longtitude} `;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "an error occurred , please check your internet connection",
        undefined
      );
    } else if (response.body.error) {
      callback("location not found", undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = { geocode: geocode, forecast: forecast };
