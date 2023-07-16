
const bcrypt = require("bcrypt");
const express = require("express");
const admin = require("../middleware/admin");
const { validate, Users,validateforpass } = require("../models/users");
const   router = express.Router();
const auth = require("../middleware/auth");
const _ = require("lodash");


router.get("/getAllUsers",auth,async (req, res) => {
  const usersList = await Users.find({role:"client"});
  res.send(usersList);
});
router.get("/getAll", auth, async (req, res) => {
  const usersList = await Users.find();
  res.send(usersList);
});
router.get("/me", auth, async (req, res) => {
  const user = await Users.findOne(req.user.phonenumber).select("-password");
  res.send(user);
});



router.get('/getuser/:userName', auth,async (req, res) => {
  try {
    const user = await Users.findOne({ userName: req.params.userName });
    if (user) {
      const phonenumber = user.phonenumber;

      res.json({ phonenumber });
      
    } else {
      res.status(404).send('User not found');
    }
   
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.post("/signUp", auth,async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  let user = await Users.findOne({ userName: req.body.userName });
  if (user)
    return res.status(400).send("user with this userName is already exists.");
  const UserRegister = new Users(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "phonenumber",
      "userName",
      "password",
      "role",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  UserRegister.password = await bcrypt.hash(UserRegister.password, salt);
  await UserRegister.save();
  res.send(
    _.pick(UserRegister, [
      "id",
      "firstName",
      "lastName",
      "phonenumber",
      "userName",
      "role",
    ])
  );
});


router.put("/Update/:userName", auth, async (req, res) => {
  // validation
  const result = validateforpass(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  let updateData = {
    password: req.body.password,
  };
  const salt = await bcrypt.genSalt(10);
  updateData.password = await bcrypt.hash(updateData.password, salt);

  const user = await Users.findOne(req.params.userName, updateData, {
    new: true,
  });
  // const genre = genresList.find((g) => g.id === parseInt(req.params.id));
  if (!user) {
    return res.status(400).send("user not found with provided id");
  }
  res.send(user);
});
//delete specfic genre api end-point
router.delete("/Delete/:phonenumber", [auth, admin], async (req, res) => {
  const user = await Users.findByphoneAndDelete(req.params.phonenumber);phonenumber

  if (!user) {
    return res.status(400).send("user not found with provided id");
  }

  res.send(user);
});

router.put('/change/:userName/password', async (req, res) => {
  try {
    const { userName } = req.params;
    const { currentPassword, newPassword } = req.body;


    const user = await Users.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid current password' });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Please try again' });
  }
});

module.exports = router;
