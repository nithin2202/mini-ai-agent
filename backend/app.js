const express = require("express");
const http = require("http");
const cors = require("cors");


// Create an HTTP server with Express
const app = express();
const server = http.createServer(app);


// Set Env File
const dotenv = require("@dotenvx/dotenvx");
dotenv.config({ path: "./.env", envKeysFile: './.env.keys' });


// Enable the server to parse requests with JSON payloads.
app.use(express.json());



// Set cors
var corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200,
};
app.use(cors());



app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


// Set Routes
const routes = require("./src/routes/queryRoutes");
const routes1=require("./src/routes/statsRoutes")
app.use("/rest2", routes);
app.use("/rest2",routes1)
 

 
module.exports = {app, server};