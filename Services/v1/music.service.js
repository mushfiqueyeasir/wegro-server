const fs = require("fs");
const path = require("path");

exports.getAllData = async (query) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../../content/v1/music.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        reject("Internal Server Error");
        return;
      }
      const jsonData = JSON.parse(data);
      if (Object.keys(query)[0] === "recommended") {
        resolve(jsonData.filter((item) => item.recommended === true));
      } else if (Object.keys(query)[0] === "trending") {
        resolve(jsonData.filter((item) => item.trending === true));
      } else {
        resolve(jsonData);
      }
    });
  });
};
