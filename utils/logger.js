/* eslint-disable no-console */
function consoleLog(params) {
  if (process.env.NODE_ENV === 'development') console.log(params);
}
function errorLog(params) {
  if (process.env.NODE_ENV === 'development') console.error(params);
}
module.exports = { consoleLog, errorLog };
