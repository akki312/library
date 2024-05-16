const { createLogger, format, transports, label } = require("winston");
const mongoWinston = require("winston-mongodb");
var appRoot = require("app-root-path");
const CONFIG = require("./dotenv");
const myFormat = format.printf(({ level, message, timestamp, label }) => {
  return `{ timeStamp : ${timestamp},level:${level},message: ${message} }`;
});
var options = {
  file: {
    level: "debug",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 52428800,
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    timestamp: true,
    format: format.combine(format.timestamp(), format.colorize(), myFormat),
    colorize: true,
  },
};
const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;