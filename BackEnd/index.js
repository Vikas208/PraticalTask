const express = require('express');
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve("config.env") });
const mongoConnect = require("./mongoConnect");
const Authentication = require("./Routers/Authentication");
const cookieParser = require("cookie-parser");
const App = require("./Routers/App");
//connect MongoDB
mongoConnect();

app.use("/auth", Authentication);
app.use("/app", App);
app.use(cookieParser());

app.listen(process.env.PORT, () => {
       console.log(`Server Started On PORT NO:${process.env.PORT
              }`)
})