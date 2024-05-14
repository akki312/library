const express = require('express');
const { MongoClient } = require('mongodb');
const { initializeBooksCollection, displayBooks, checkoutBook } = require('./library');

const app = express();

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'libraryManagement';

async function connectDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    return {
      books: db.collection('books'),
      members: db.collection('members'),
      transactions: db.collection('transactions')
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

app.use(express.json());

app.get('/books', async (req, res) => {
  await displayBooks();
  res.send('Books displayed in console.');
});

app.post('/checkout', async (req, res) => {
  const { memberId, bookId } = req.body;
  await checkoutBook(memberId, bookId);
  res.send('Book checked out.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
