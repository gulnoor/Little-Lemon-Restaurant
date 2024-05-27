const { default: mongoose } = require('mongoose');
const cors = require('cors');
//   getToken,
const express = require('express');
require('express-async-errors');
const menuRouter = require('./controllers/menuController');
const { consoleLog, errorLog } = require('./utils/logger');
const {
  errorHandler,
  requestLogger,
  unknownPathHandler,
} = require('./utils/middleware');

const app = express();

// Connect to Mongo database
const { MONGODB_URL_PRODUCTION, MONGODB_URL_TEST } = require('./utils/config');
const userController = require('./controllers/userController');
const orderRouter = require('./controllers/orderController');
const loginRouter = require('./controllers/loginRouter');

const dbURI = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
  ? MONGODB_URL_TEST
  : MONGODB_URL_PRODUCTION;
mongoose.set('strictQuery', false);
mongoose
  .connect(dbURI)
  .then(() => {
    consoleLog('connected to MongoDB');
    consoleLog(`using ${process.env.NODE_ENV} database`);
  })
  .catch((error) => {
    errorLog('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
// app.use(getToken);
app.use(requestLogger);
app.use('/api/menu', menuRouter);
app.use('/api/user', userController);
app.use('/api/order', orderRouter);
app.use('/api/login', loginRouter);
app.use(unknownPathHandler);
app.use(errorHandler);

module.exports = app;
