const express = require('express');
const router = express.Router();
const { validationResult, body } = require("express-validator");
const userDetails = require("../Schemas/User");
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
require('dotenv').config({ path: path.resolve("../config.env") });
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), (req, res) => {
       try {
              // console.log(req.body);
              let err = validationResult(req);
              if (!err.isEmpty()) {
                     res.status(403).json({ message: "Bad Credintials" });
              } else {
                     const user = new userDetails({
                            email: req.body.email, name: req.body.name, password: req.body.password, historyPassword
                                   : [req.body.password]
                     });
                     user.save(async (err, result) => {
                            if (err) {
                                   res.status(403).json({ message: "You are already Registered" });
                            } else {
                                   let token = jsonwebtoken.sign({ id: req.body.email }, process.env.SECRET_KEY, {
                                          expiresIn: 86400,
                                   });
                                   let id = await userDetails.findOne({ email: req.body.email }, { _id: 1 }).exec();
                                   res.json({ message: "Register SuccessFully", token: token, user_id: id?._id });
                            }
                     });
              }
       } catch (err) {
              console.log(err);
              res.sendStatus(500);
       }
});

router.post("/login", body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
       try {
              // console.log(req.body);
              let err = validationResult(req);

              if (!err.isEmpty()) {
                     res.status(403).json({ message: "Bad Credentials" });
              }
              else {
                     let user = await userDetails.find({ email: req.body.email, password: req.body.password }).exec();
                     // console.log(user);
                     if (user.length === 1) {

                            let token = jsonwebtoken.sign({ id: req.body.email }, process.env.SECRET_KEY, {
                                   expiresIn: 86400,
                            });
                            res.status(200).json({ message: "Logined", token: token, user_id: user[0]._id });

                     }
                     else {
                            res.status(403).json({ message: "Bad Credentials" });
                     }
              }
       } catch (err) {
              console.log(err);
              res.sendStatus(500);
       }
});

router.put("/changePassword", body("email").isEmail(), body("newPassword").isLength(6), async (req, res) => {
       try {
              let user = await userDetails.find({ email: req.body.email, historyPassword: { $ne: req.body.newPassword } }).exec();
              if (user.length === 1) {

                     let historyPassword = user[0]?.historyPassword;
                     if (historyPassword.length === 3) {
                            historyPassword.shift();
                            historyPassword.push(req.body.newPassword);
                     }
                     else {
                            historyPassword.push(req.body.newPassword);
                     }

                     let update = userDetails.updateOne({ email: req.body.email }, { password: req.body.newPassword, historyPassword: historyPassword }).exec();

                     update.then(result => {
                            res.status(200).json({ message: "Password Updated" });
                     }).catch(err => {
                            res.status(403).json({ message: "Something went wrong" });
                     })

              }
              else {
                     res.status(403).json({ message: "Please try another one" });
              }
       } catch (err) {
              console.log(err);
              res.sendStatus(500);
       }
});



module.exports = router;
