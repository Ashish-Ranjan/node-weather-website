const request = require("postman-request");
const { API_ACCESS_KEY } = require("../config.json");

const forCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${API_ACCESS_KEY}&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike, humidity } =
        body.current;
      const data = `${weather_descriptions[0]}, It is currently ${temperature} degrees. It feels like ${feelslike} degrees out. current humidity ${humidity}%.`;
      callback(undefined, data);
    }
  });
};

module.exports = { forCast };
