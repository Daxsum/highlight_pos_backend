const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id, role: this.role }, process.env.JWT);
  return token;
};
const Users = mongoose.model("Users", userSchema);

function validate(userData) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    userName: Joi.string().min(3).required(),
    phonenumber:Joi.string().length(10).pattern(/^[0-9]+$/).messages({'string.pattern.base': `Phone number must have only digits.`}).required(),    role: Joi.string().min(1).required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(userData);
}
function validateforpass(userData) {
  const schema = Joi.object({
    password: Joi.string().min(3).required(),
  });
  return schema.validateforpass(userData);
}
exports.validate = validate;
exports.validateforpass = validateforpass;
exports.Users = Users;
exports.userSchema = userSchema;
