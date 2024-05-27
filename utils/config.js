require('dotenv').config();

const {
  MONGODB_URL_PRODUCTION, PORT, MONGODB_URL_TEST, JWT_SEKRET,
} = process.env;

module.exports = {
  MONGODB_URL_PRODUCTION,
  MONGODB_URL_TEST,
  PORT,
  JWT_SEKRET,
};
