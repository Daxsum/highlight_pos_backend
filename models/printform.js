const mongoose = require("mongoose");
require("dotenv").config();
FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agentname: {
    type: String,
    required: true,
  },
  Customername: {
    type: String,
    required: true,
  },
});


module.exports=mongoose.model("forms",FormSchema);
