const request = require("postman-request");

const forCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=928cff520c2a531afcd481fc6eac46d7&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike, humidity } = body.current;
      const data = `${weather_descriptions[0]}, It is currently ${temperature} degrees. It feels like ${feelslike} degrees out. current humidity ${humidity}%.`;
      callback(undefined, data);
    }
  });
};

module.exports = { forCast } ;
