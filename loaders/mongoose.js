// Imports:
const mongoose = require("mongoose");
//require("mongoose-uuid2")(mongoose);
const CONFIG = require("./dotenv");
const logger = require("./logger");
// const logger = require("./logger");

const uri = process.env.MONGODB_URI;

//const uri = 'mongodb://localhost:27017/'//
mongoose.connect(
  process.env.MONGODB_CONNECTIONSTRING || CONFIG.MONGODB_CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,  
    socketTimeoutMS: 45000 
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  logger.info("mongoDB connected");
});
// mongoose.db = makeNewConnection(process.env.MONGODB_CONNECTIONSTRING);

module.exports = mongoose;
