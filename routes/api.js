const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
const dbName = 'library';
const {connectDatabase} = require('../loaders/mongoose');

app.use(express.json());

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

// Endpoint to display available books
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

// POST method to add a new book
app.post('/books', async (req, res) => {
    const newBook = req.body;
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            await booksCollection.insertOne(newBook);
            res.status(201).json({ message: 'Book created successfully' });
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// PUT or PATCH method to update an existing book
app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const result = await booksCollection.updateOne(
                { id: parseInt(bookId) },
                { $set: updatedBookData }
            );
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json({ message: 'Book updated successfully', bookId: bookId });
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }   
});

// DELETE method to delete a book by ID
app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const result = await booksCollection.deleteOne({ id: parseInt(bookId) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// GET method to retrieve a specific book by ID
app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const booksCollection = await connectDatabase();
    if (booksCollection) {
        try {
            const book = await booksCollection.findOne({ id: parseInt(bookId) });
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            console.error('Error fetching book from database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management API');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
