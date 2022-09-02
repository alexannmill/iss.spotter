const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP.`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsbyIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);

    if (data.success === false) {
      const msg = `invalid IP address`;
      callback(Error(msg), null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching Coord.`;
      callback(Error(msg), null);
      return;
    }
    const latitude = data.latitude;
    const longitude = data.longitude;
    const coord = { lat: latitude, long: longitude };
    callback(null, coord);
  });
};

fetchISSFlyTimes = (coord, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coord.lat}&lon=${coord.long}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching fly times.`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body);
      const times = data.response;
      callback(null, times);
    }
  );
};

nextISSFlyover = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsbyIP(ip, (error, coord) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyTimes(coord, (error, times) => {
        if (error) {
          callback(error, null);
          return;
        }
        const passTimes = times;
        callback(null, passTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsbyIP,
  fetchISSFlyTimes,
  nextISSFlyover,
};
