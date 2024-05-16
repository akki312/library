const logger = require("../loaders/logger");
const util = require("./util");
async function sendResponse(err, res) {
  // console.log("sendResponse line 4", err);
  let error = await util.errorHandler(err);
  logger.error(`${error.code || 500} - ` + JSON.stringify(error.error));
  if (error.code == undefined) {
    res
      .status(503)
      .send({ code: 503, errors:[{message:error.error}] });
  } else {
    let tmpCode = error.code;
    // delete error.code;
    res.status(tmpCode).send(error);
  }
}

module.exports = sendResponse;