const app = (module.exports = require('express'))

app.get("/", (req, res) => {
    res.send({ msg: "library serviceis up and running" });
  });
app.use('/books', require('../routes/library'))
