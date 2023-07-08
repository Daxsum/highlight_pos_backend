const _ = require("lodash");

const express = require("express");

const router = express.Router();
const  forms  = require("../models/printform");

router.get("/getAll", async (req, res) => {
  const usersList = await forms.find();
  res.send(usersList);
});
router.post("/data", async (req, res) => {
    const addprint = new forms(
      _.pick(req.body, [
        "name",
        "agentname",
        "CustomerName",
      ])
    );
    
    res.send(
      _.pick(addprint, [
        "name",
        "agentname",
        "CustomerName",
      ])
    );
  });
  module.exports = router;