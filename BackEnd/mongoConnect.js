const mongoose = require("mongoose");

const mongoConnect = () => {

       mongoose.connect(process.env.URI, (err) => {
              if (err) {
                     console.log(err);
                     console.log("Falid To Connect");
              }
              else {
                     console.log("Connected Successfully");
              }
       })
}

module.exports = mongoConnect;