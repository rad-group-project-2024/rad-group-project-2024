// Importing modules
const mongoose = require("mongoose");

// Creating borrower schema
const BorrowerSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Borrower", BorrowerSchema);
