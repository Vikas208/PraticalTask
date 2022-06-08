const mongoose = require('mongoose');

const category = new mongoose.Schema({
   cat_name: {
      type: String,
      required: true,
      unique: true,
   }
})

module.exports = mongoose.model("category", category);