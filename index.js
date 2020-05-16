/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a ... make some middleware, don't worry, just hack it

Go code!
*/

const express = require("express");
const cors = require("cors");
const server = require("./server.js");
const projectRouter = require("./routers/projects/projectRouter");

server.use(express.json());
server.use(cors());

server.use("/projects", projectRouter);

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});
