const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  ISBN: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  availabilty : {type: Boolean, default: true}
  // Other fields can go here
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


// module.exports = mongoose.model('Book', bookSchema);
