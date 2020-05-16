const express = require("express");

const server = express();
server.use(logger);
server.get("/", (req, res) => {
  res.send(`welcome to the SPRINT CHALLENGE!`);
});

//logger from previous project

function logger(req, res, next) {
  console.log("---------------------------------\n");
  console.log(req.method, " Request received---\n");
  console.log("At URL: ", req.url, "\n");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const currDate = new Date();

  console.log(currDate.toLocaleDateString("en-US", options));
  console.log("---------------------------------\n");

  next();
}
module.exports = server;
