const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const bookinfo = require('../library/models/usersModel');

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

const booksData = [
  { 
    id: 1, 
    title: 'Book Title 1', 
    author: 'Author 1',
    ISBN: '123456789',
    availability: true
  },
  { 
    id: 2, 
    title: 'Book Title 2', 
    author: 'Author 2',
    ISBN: '987654321',
    availability: true
    
  },
  
];


async function initializeBooksCollection() {
  const { books } = await connectDatabase();
  if (books) {
    try {
      await books.deleteMany({});
      await books.insertMany(booksData);
      console.log('Books collection initialized');
    } catch (error) {
      console.error('Error initializing books collection:', error);
    }
  }
}

async function displayBooks() {
  const { books } = await connectDatabase();
  if (books) {
    try {
      const allBooks = await books.find({}).toArray();
      let availableBooks = 0;
      let takenBooks = 0;

      console.log('Available Books:');
      allBooks.forEach(book => {
        console.log(`${book.id}. ${book.title} by ${book.author}: ${book.availability ? 'Available' : 'Not Available'}`);
        if (book.availability) {
          availableBooks++;
        } else {
          takenBooks++;
        }
      });

      console.log(`Total Available Books: ${availableBooks}`);
      console.log(`Total Taken Books: ${takenBooks}`);
    } catch (error) {
      console.error('Error fetching books from database:', error);
    }
  }
}


async function checkoutBook(memberId, bookId) {
  const { books, members, transactions } = await connectDatabase();
  if (books && members && transactions) {
    try {
      const book = await books.findOne({ id: bookId });
      const member = await members.findOne({ id: memberId });
      if (!book || !member) {
        console.log('Book or member not found');
        return;
      }
      if (!book.availability) {
        console.log('Book is not available');
        return;
      }
     
      await books.updateOne({ id: bookId }, { $set: { availability: false } });
      
      await transactions.insertOne({ memberId, bookId, checkoutDate: new Date() });
      console.log(`Book "${book.title}" has been checked out by member "${member.name}"`);
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  }
}



async function runExample() {
  await initializeBooksCollection(); // Wait for books to be initialized
  await displayBooks(); // Display the updated books data
  await checkoutBook(1, 1); // Example transaction: Member with ID 1 checks out Book with ID 1
  await displayBooks(); // Display the updated books data after checkout
}


runExample();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
