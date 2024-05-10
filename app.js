const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');
const bookapi = require('../library/routes/index');
const bookinfo = require('../library/models/usersModel');

const app = express();

const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'movieTickets';
const baseURL = 'http://localhost:3000';


const axios = require('axios');

async function makeHttpRequest() {
    try {
        const response = await axios.get('http://localhost:3000/endpoint');
        console.log(response.data);
        const postData = { key: 'value' };
        const postResponse = await axios.post('http://localhost:3000/endpoint', postData);
        console.log(postResponse.data);
    } catch (error) {
        console.error('Error making HTTP request:', error.message);
    }
}
makeHttpRequest();


async function connectDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        return db.collection('books');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

app.use(express.json());

app.get('/books', async (req, res) => {
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const books = await booksCollection.find({}).toArray();
            res.json(books);
        } catch (error) {
            console.error('Error fetching books from database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

async function initializeBooksCollection(booksData) {
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            await booksCollection.deleteMany({});
            await booksCollection.insertMany(booksData);
            console.log('Books collection initialized');
        } catch (error) {
            console.error('Error initializing books collection:', error);
        }
    }
}

async function displayBooks() {
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const books = await booksCollection.find({}).toArray();
            console.log('Available Books:');
            books.forEach(book => {
                console.log(`${book.id}. ${book.title}:`);
                book.bookCollection.forEach(category => {
                    console.log(`- ${category.category} (${category.available} available)`);
                });
            });
        } catch (error) {
            console.error('Error fetching books from database:', error);
        }
    }
}

async function bookTicket(bookId, categoryName, selectedSeat, couponCode) {
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const book = await booksCollection.findOne({ id: bookId });
            if (!book) {
                console.log('Book not found');
                return;
            }
            const category = book.bookCollection.find(cat => cat.category === categoryName);
            if (!category) {
                console.log('Category not found');
                return;
            }
            if (category.seats[selectedSeat] !== 'available') {
                console.log(`Seat ${selectedSeat} in category ${categoryName} is already booked`);
                return;
            }

            let totalPrice = category.price; // Initialize total price with standard price

            // Apply coupon code logic
            if (couponCode === 'HALFOFF') {
                totalPrice /= 2; // Apply 50% discount
            } else if (couponCode === 'FREEMOVIE') {
                // Apply free movie logic
                // Adjust totalPrice and other logic accordingly
            }

            // Update takenDate
            const takenDate = new Date();

            category.seats[selectedSeat] = 'booked';
            category.takenDate = takenDate;
            await booksCollection.updateOne(
                { id: bookId, 'bookCollection.category': categoryName },
                { $set: { 'bookCollection.$.seats': category.seats, 'bookCollection.$.takenDate': takenDate } }
            );
            console.log(`Successfully booked seat ${selectedSeat} in category ${categoryName} for ${book.title}. Total price: $${totalPrice}`);
        } catch (error) {
            console.error('Error booking ticket:', error);
        }
    }
}

async function runExample() {
    const booksData = [
        {
            id: 1,
            title: 'The Avengers',
            bookCollection: [
                { author: 'J.K. Rowling', available: 50, taken: 0,  },
                
            ]
        },
        {
            id: 2,
            title: 'The Shawshank Redemption',
            bookCollection: [
                { author: 'J.K. Rowling',  available: 30, taken: 0,  },
              
            ]
        },
        {
            id: 3,
            title: 'The Godfather',
            bookCollection: [
                { author: 'J.K. Rowling',  available: 40, taken: 0,  },
                
            ]
        },
        {
            id: 4,
            title: 'Something',
            bookCollection: [
                { author: 'J.K. Rowling',  available: 40, taken: 0 },
                
            ]
        },
        {
            id: 5,
            title: 'That Thing',
            bookCollection: [
                { author: 'J.K. Rowling',  available: 40, taken: 0 },
               
            ]
        }
    ];

    await initializeBooksCollection(booksData);
    await displayBooks();
    await bookTicket(1,  10, 'HALFOFF');
  
}

runExample();

// Start the Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
