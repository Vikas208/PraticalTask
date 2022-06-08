const mongoose = require('mongoose');

const faq = new mongoose.Schema({
       cat_id: {
              type: mongoose.Types.ObjectId,
              ref: mongoose.Types.ObjectId,
       },
       user_id: {
              type: mongoose.Types.ObjectId,
              ref: mongoose.Types.ObjectId,
       },
       faq: {
              type: String,
              required: true,
       },
       ans: {
              type: String,
              default: '',
       }
});

module.exports = mongoose.model("faq", faq);

