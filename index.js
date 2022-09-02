const { fetchMyIP, fetchCoordsbyIP, fetchISSFlyTime,nextISSFlyover } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//   } else {
//     console.log("It worked! Returned IP:", ip);
//   }
// });

// fetchCoordsbyIP("107.190.25.130", (error, coord) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//   } else {
//     console.log("Coordinates are: ", coord);
//   }
// });

// fetchISSFlyTimes({ lat: 48.4284207, long: -123.3656444 }, (error, times) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//   } else {
//     console.log("Flyover times: ", times);
//   }
// });

const timeConverter = (passTimes) => 
  passTimes.forEach(times => {
    const dateTime = new Date(0);
    dateTime.setUTCDate(passTimes.risetimes);
    const duration = passTimes.duration;
    console.log(`next pass as ${dateTime} for ${duration} seconds`)
  });



  nextISSFlyover((error, passTimes) => {
    if (error) {
      console.log( "It didn\'t work! ", error)
    };
    timeConverter(passTimes);
  });
