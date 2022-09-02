const requestPromise = require('request-promise-native');
const { fetchMyIPPromise, fetchCoordsByIPPromise, fetchISSFlyTimesPromise, nextFlyOverPromise } = require('./iss_promised');


nextFlyOverPromise()
  .then(passTimes => {
    console.log(passTimes)
  })
  .catch(error => {
    console.log("it didnt work", error.message);
  });



