const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err)) 
}