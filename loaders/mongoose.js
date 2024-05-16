// Imports:
const mongoose = require("mongoose");
//require("mongoose-uuid2")(mongoose);
const CONFIG = require("./dotenv");
// const logger = require("./logger");


mongoose.connect(
  process.env.MONGODB_CONNECTIONSTRING || CONFIG.MONGODB_CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.info("mongoDB connected");
});
// mongoose.db = makeNewConnection(process.env.MONGODB_CONNECTIONSTRING);




module.exports = mongoose;







