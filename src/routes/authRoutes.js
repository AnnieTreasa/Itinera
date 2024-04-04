const {Router} =  require('express');
import userModel from '../models/user'
const router = Router();



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      //const user = await userModel.findByEmail(email); // Find user by email
      const user = await userModel.findByemail(email)
      console.log(user)
      if (!user) {
        // User not found, handle the error
        return res.render('login', { error: 'Invalid email or password' });
      }
  
      //const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
      let isMatch = false;
      if (password == user.password) {
        isMatch=true;
    } else {
        isMatch=false; };

      if (isMatch) {
        const sessionUser = { ...user };
        delete sessionUser.password;
        req.session.user = sessionUser; // Store user object in session
        
        console.log('hello',req.session.user)
         res.render('traveller/traveller_home'); // Redirect to traveler_home page on successful login
        //return user;
      } else {
        res.render('login', { error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.render('login', { error: 'An error occurred' });
    }
  });
router.get( '/logout', async (req, res) => {
    return res.render('home');
});



module.exports = router;