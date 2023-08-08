const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const formsschema = new Schema({
    name: {
        type: String,
        required:true
    },
    agentname: {
        type: String,
        required: true
    },
    customername: {
        type: String,
        deafult: true
    },
    beneficiary: {
        type: String,
        deafult: true
    },
    agentlocation: {
        type: String,
        deafult: true
    },
    amount: {
        type: String,
        deafult: true
    },
    tax: {
        type: String,
        deafult: true
    },
    phonenumber: {
        type: String,
        deafult: true
    },   
    recieptnumber: {
        type: String,
        deafult: true
    },
    createdat:{
      type : Date,
      default :Date.now()
    }
});


const Forms = mongoose.model('forms',formsschema);

module.exports = Forms;