// const { default: mongoose } = require('mongoose');
const cors = require("cors");
const express = require("express");
require("express-async-errors");
const {
  errorHandler,
  requestLogger,
  unknownPathHandler,
  //   getToken,
} = require("./utils/middleware");

const app = express();

// Connect to Mongo database
// const { MONGODB_URL_PRODUCTION, MONGODB_URL_TEST } = require('./utils/config');
// const { consoleLog } = require("./utils/logger");
// const dbURI =
//   process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
//     ? MONGODB_URL_TEST
//     : MONGODB_URL_PRODUCTION;
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(dbURI)
//   .then(() => {
//     ("connected to MongoDB");
//   })
//   .catch((error) => {
//     consoleLog("error connecting to MongoDB:", error.message);
//   });

app.use(cors());
app.use(express.json());
// app.use(getToken);
app.use(requestLogger);
// Use Routers
// app.use("/api/blogs", blogRouter);
app.use(unknownPathHandler);
app.use(errorHandler);

module.exports = app;
