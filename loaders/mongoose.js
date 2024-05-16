// Imports:
const mongoose = require("mongoose");
//require("mongoose-uuid2")(mongoose);
const CONFIG = require("./dotenv");
// const logger = require("./logger");


function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });
  db.on("connected", function () {
    console.log(`MongoDB :: connected ${this.name}`);
  });
  return db;
}
mongoose.db1 = makeNewConnection(process.env.MONGODB_CONNECTIONSTRING);




module.exports = mongoose;







