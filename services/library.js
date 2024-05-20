const bookModel = require("../models/book")
const logger = require("../loaders/logger")

async function createBooks(data) {
  try {
    logger.info("inserting  the books data");
    let newBook = await bookModel({
      ISBN: "ISBN9992",
      author: "backed",
      title: "something",
      availability: "true"
    }

    );
    let dbResponse = await newBook.save();
    console.log(dbResponse);
    return true;
  } catch (err) {
    logger.error("Error: " + err);
    throw err;
  }
}



exports.libraryService = {
  createBooks: createBooks
}


