const express = require('express');
const router = express.Router();
const category = require("../Schemas/Category");
const faq = require("../Schemas/Faq");
const bodyParse = require("body-parser");
const bodyParser = require('body-parser');
const middleware = require("../MiddleWare/middleware");
const { default: mongoose } = require('mongoose');

router.use(bodyParse.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Create New Category of FAQ 
router.post("/createNewCategory", async (req, res) => {
       try {
              let cat = new category({ cat_name: req.body.categoryName });
              cat.save((err, result) => {
                     if (err) {
                            res.json({ message: "Category is Already there in database" });
                     }
                     else {
                            res.status(200).json({ message: "Category Saved" });
                     }
              })

       } catch (err) {
              console.log(err);
              res.status(500).json({ message: "Something went wrong" });
       }
});
//for answer the question
router.post("/answerQuestion", async (req, res) => {
       try {
              await faq.updateOne({ _id: req.body.id }, { ans: req.body.answer }).exec();
              res.status(200).json({ message: "Answert Updated" });
       } catch (err) {
              res.status(500).json({ message: "Something is wrong" });
       }

});
//for add new question 
router.post("/addQuestion", [middleware.Authenticate], async (req, res) => {
       try {
              // console.log(req.body);
              let question = new faq({ cat_id: req.body.id, faq: req.body.question, user_id: req.body.user_id });

              let isAvailable = await faq.find({ cat_id: mongoose.Types.ObjectId(req.body.id), faq: req.body.question }).exec();

              if (isAvailable.length === 0) {
                     question.save();
                     res.status(200).json({ message: "Question Updated" });
              }
              else {
                     res.json({ message: "Question is Available in this category" });
              }

       } catch (err) {
              console.log(err);
              res.status(500).json({ message: "Something went wrong" });
       }
})
//fetch all category question
router.get("/getCategoryQuestion", middleware.Authenticate, async (req, res) => {
       try {
              let { id } = req.query;
              let questions = await faq.find({ cat_id: mongoose.Types.ObjectId(id), ans: { $ne: "" } }).exec();
              // console.log(questions);
              res.json({ questions: questions });
       } catch (err) {
              res.status(500).json({ message: "Something is wrong" });
       }
});


//deleting category
router.delete("/deleteCategory", middleware.Authenticate, async (req, res) => {
       try {
              await faq.deleteMany({ cat_id: mongoose.Types.ObjectId(req.query.id) }).exec();
              await category.findByIdAndDelete({ _id: req.query.id }).exec();
              res.status(200).json({ message: "Delete Successfully" });
       } catch (err) {
              res.status(500).json({ message: "Something is wrong" });
       }
})
//fetch all categoy
router.get("/getAllCategory", middleware.Authenticate, async (req, res) => {
       try {
              let categories = await category.find({}).exec();
              res.status(200).json({ message: "Successfully", categories: categories });
       } catch (err) {
              res.status(500).json({ message: "Something is wrong" });
       }
})

module.exports = router;
