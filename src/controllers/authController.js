const User = require("../models/user");
import userModel from '../models/user'
//const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'net ninja secret', {
//     expiresIn: maxAge
//   });
// };

// controller actions
module.exports.trav_signup_get = (req, res) => {
  res.render('trav_signup');
}

module.exports.trav_login_get = (req, res) => {
  res.render('common/logins');
}

module.exports.trav_signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password before storing (security best practice)
    //const hashedPassword = await hashPassword(password);

    // Create user object to pass to create function
    const user = { name: username, email: email, password: password };
    
    // Call the create function from your model
    const createdUser = await userModel.create(user);
    
    res.status(201).json({ message: 'Successfully registered', user: createdUser });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ message: 'Registration failed',errors });
  }
 
}

module.exports.trav_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}