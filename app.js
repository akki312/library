const app = require('./loaders/express');
const { MongoClient } = require('mongodb');
// const CONFIG = require("./dotenv")
const handleAsyncExceptions = require("./loaders/handleError");
const logger = require('./loaders/logger');
const routes = require('./routes');

async function run(){
  try{
  app.use(routes)
  app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST, function (err) {
    if (err) {
      logger.error("Failed to start the server " + err);
    }
    logger.info(
      "library Module is running on http://" +
        process.env.EXPRESS_HOST +
        ":" +
        process.env.EXPRESS_PORT
    );
  });
} catch (err) {
  // console.log(err);
  logger.error("Error: " + err);
  throw new Error(err);
}
}
module.exports = run;
if (require.main === module) {
  handleAsyncExceptions();
  run();
}
