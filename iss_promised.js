const requestPromise = require('request-promise-native');


const fetchMyIPPromise = () => {
  return requestPromise(("https://api.ipify.org?format=json"))
  .then((body) => {
    const data = JSON.parse(body);
    const ip = data.ip
    return ip
  });
};


const fetchCoordsByIPPromise = (ip) => {
  return requestPromise(`http://ipwho.is/${ip}`)
  .then((body) => {
    const data = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;
    coord = { lat: latitude, long: longitude };
  return coord;
  });
};

const fetchISSFlyTimePromise = (coord) => {
  return requestPromise(
    `https://iss-pass.herokuapp.com/json/?lat=${coord.lat}&lon=${coord.long}`)
    .then((body) => {
      const data = JSON.parse(body);
      const times = data.response;
      return times
  });
};

const nextFlyOverPromise = (times) => {
  return fetchMyIPPromise()
  .then(fetchCoordsByIPPromise)
  .then(fetchISSFlyTimePromise)
  .then ((times) => {
    const passTimes = times;
    return passTimes
  })
};

module.exports = { fetchMyIPPromise, fetchCoordsByIPPromise , fetchISSFlyTimePromise, nextFlyOverPromise }