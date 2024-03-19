const express = require("express");
const path = require("path");
const fs = require("fs");
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

app.get("/video/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "/content/music", fileName);

  // Check if the file exists
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = app;
