// Imports:
const mongoose = require("mongoose");
//require("mongoose-uuid2")(mongoose);
const CONFIG = require("./dotenv");
const logger = require("./logger");

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
  console.info("mongoDB connected");
});

const db1 = mongoose.createConnection(
  process.env.BOOKDB_CONNECTIONSTRING || CONFIG.BOOKDB_CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

db1.on("error", console.error.bind(console, "connection error for pharmaDB:"));
db1.once("open", function () {
  console.info("librarydb connected");
});

const db3 = mongoose.createConnection(
  process.env.BOOKDB_CONNECTIONSTRINGDB_CONNECTIONSTRING || CONFIG.BOOKDB_CONNECTIONSTRINGDB_CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

db3.on("error", console.error.bind(console, "connection error for labDB:"));
db3.once("open", function () {
  console.info("bookDB connected");
});

mongoose.db1 = db1;
mongoose.db2 = db3;
module.exports = mongoose;