const app = require('./app');
const { PORT } = require('./utils/config');
const { consoleLog } = require('./utils/logger');

app.listen(PORT, () => {
  consoleLog(`Server running on port ${PORT}`);
});
