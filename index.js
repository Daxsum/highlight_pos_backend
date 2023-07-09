require("express-async-errors"); ////this package replace async module in medilware directory i use it for simplisity or you can you asyc module and wrap all the routes with async module exported function to make sure logging error working
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const forms = require("./routes/forms");
const login = require("./routes/auth");
const error= require("./middleware/error")
const path = require("path");
let cors = require("cors");
require("dotenv").config();
/////connecting to database
await mongoose 
  .connect(
   process.env.API1
  )
  .then(() => {
    console.log("I'm connected to mongoDB ;-) ...");
  })
  .catch((err) => {
    console.log(":-( couldn't connect to mongoDb because of: ", err);
  });
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", users);
app.use("/api/forms", forms);
app.use("/api/login", login);
app.use(error);

const port = process.env.PORT || 2345;
app.listen(port, () => {
  console.log(`I'm listening at port ${port} ...`);
});
