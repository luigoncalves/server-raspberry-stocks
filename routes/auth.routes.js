const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (email === '' || password === '' || name === '') {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    // use regex to validate the email format
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Provide a valid email address' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password should have at least 6 characters one lower and upper case letter, a number and a special character',
      });
    }

    // to check if the email is already in use

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'The provided email is already registered' });
    }

    // Encrypt the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // create the user

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    // returning the created user without sending the hashedPassword
    res.json({ email: newUser.email, name: newUser.name, _id: newUser._id });
  } catch (error) {
    console.log('Error creating the user');
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (email === '' || password === '') {
      return res.status(404).json({ message: 'All fields need to be filled' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ messsage: 'Provided email is not registered' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      // create a payload for the JWT with the user info
      // DO NOT SEND THE HASHED PASSWORD
      const payload = { _id: user._id, email: user.email, name: user.name };

      //creating the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256', //algorithm we want to encrypt the token with
        expiresIn: '6h', // time to live of the JWT
      });
      res.status(200).json({ authToken });
    } else {
      return res.status(401).json({ message: 'Unable to authenticate user' });
    }
  } catch (error) {
    console.log('An error occurred login in the user', error);
    next(error);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  // if the jwt is valid, the payload gets decoded by the middleware and is made available in req.payload
  console.log('req.payload', req.payload);

  // send it back with the user data from the token
  res.json(req.payload);
});

module.exports = router;
