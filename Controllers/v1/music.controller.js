const { getAllData } = require("../../Services/v1/music.service");
const path = require("path");
exports.getAll = async (req, res, next) => {
  try {
    const result = await getAllData(req.query);
    let temp = []
    res.status(200).json({
      status: "success",
      message: "All Music Data Acquired Successfully!",
      data: result,
      length: result.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "All Music Data Couldn't Acquired Unsuccessful!",
      error: error.message,
    });
  }
};
