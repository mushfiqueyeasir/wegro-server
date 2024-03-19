const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

//Connect to the DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Backend is connected with MongoDB`.cyan.bold);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Database Backend App is listening on port ${port}`);
});
