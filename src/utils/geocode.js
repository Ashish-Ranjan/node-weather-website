const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2hpc2gxMDAiLCJhIjoiY2t5Y3pxaDNyMHU5ODJ2bjB3dnZycXR3bSJ9.iArbV0gwW6JbtY7-pp0fmg&limit=1`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = { geoCode } ;
