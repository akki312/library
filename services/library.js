const book = require("../models/book")
const logger = require("../loaders/logger")

async function createBooks(data) {
  try {
    logger.info("inserting  the books data");
    let newBook = await new book({
      ISBN: data.ISBN,
      author: data.author,
      title: data.title,
      availability: true
    });
    let dbResponse = await newBook.save();
    console.log(dbResponse);
    return dbResponse;s
  } catch (err) {
    logger.error("Error: " + err);
    throw err;
  }
}



exports.libraryService = {
  createBooks: createBooks
}


