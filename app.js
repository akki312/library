const app = require('./loaders/express');
const { MongoClient } = require('mongodb');
// const CONFIG = require("./dotenv")
const handleAsyncExceptions = require("./loaders/handleError");
const logger = require('./loaders/logger')
// const { initializeBooksCollection, displayBooks, checkoutBook } = require('./library');

// const app = express();

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'libraryManagement';
/*const {connectDatabase} = require('../loaders/mongoose');*/

// async function connectDatabase() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     return {
//       books: db.collection('books'),
//       members: db.collection('members'),
//       transactions: db.collection('transactions')
//     };
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }


// connectDatabase().then(() => {
//   console.log('Database connected successfully.');
// }).catch((error) => {
//   console.error('Failed to connect to the database:', error);
// });

// app.use(express.json());

// app.get('/books', async (req, res) => {
//   // await displayBooks();
//   res.send('Books displayed in console.');
// });

// app.post('/checkout', async (req, res) => {
//   const { memberId, bookId } = req.body;
//   // await checkoutBook(memberId, bookId);
//   res.send('Book checked out.');
// });

async function run(){
  try{
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
