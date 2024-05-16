// Imports:
const mongoose = require("mongoose");
//require("mongoose-uuid2")(mongoose);
const CONFIG = require("./dotenv");
// const logger = require("./logger");

/*async function connectDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        return db.collection('books');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}*/

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
  console.log("mongoDB connected");
});

module.exports = mongoose;