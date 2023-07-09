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
    required: false,
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
    phonenumber:Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
    role: Joi.string().min(1).required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(userData);
}
exports.validate = validate;
exports.Users = Users;
exports.userSchema = userSchema;
