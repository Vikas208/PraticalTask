const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve("../config.js") });
const middleware = {
       Authenticate: async (req, res, next) => {
              try {
                     // console.log(req);
                     let token = req.headers.authorization
                     // console.log(token);
                     if (token) {
                            jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decode) => {
                                   if (err) {
                                          res.sendStatus(403);
                                   } else {
                                          next();
                                   }
                            })
                     }
                     else {
                            res.sendStatus(403);
                     }



              } catch (err) {
                     res.status(500).json({ message: "Something went wrong" });
              }
       }
}

module.exports = middleware;