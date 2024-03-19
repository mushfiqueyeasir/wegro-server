const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static(__dirname + "/public/"));

//middleware
app.use(cors());
app.use(express.json());

//routes
const userRoute = require("./Routes/v1/user.route");
const musicRoute = require("./Routes/v1/music.route");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/music", musicRoute);

module.exports = app;
