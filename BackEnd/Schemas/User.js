const mongoose = require("mongoose");

const usersDetails = new mongoose.Schema({
       name: {
              type: String
       },
       email: {
              type: String,
              require: true,
              unique: true
       },
       password: {
              type: String,
              require: true,
       },
       historyPassword: {
              type: Array,
              require: true
       }
})

module.exports = mongoose.model("userDetails", usersDetails);