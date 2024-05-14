const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes for handling book-related operations
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.addBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
