
import express from 'express'
const session = require('express-session');
import user from './src/routes/user'
import other from './src/routes/others'
import common from './src/routes/common'
import itin from './src/routes/itineraryroute'
import auth from './src/routes/authRoutes'
import rout from './src/routes/tripadvisor'
import search from './src/routes/search';
import userModel from './src/models/user'
// import itn  from './src/routes/itin'
// import { getPlacesData, getWeatherData } from './src/api/travelAdvisorAPI';
const itineraryRoutes = require('./src/routes/itinerary');
//const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
//const itineraryController = require('./src/controller/itineraryController');
//const GoogleGenerativeAI = require("@google/generative-ai");
const { getTravelTime } = require('./src/models/itin'); // Assuming the function is in a separate file
const { findPOIs, findTravelTime } = require('./src/models/itin');

require('dotenv').config()

const app = express()

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize session middleware
app.use(session({ secret: 'my_secret_key' }));
// Serve static files
app.use(express.static('public'));
app.use(express.json())
// Use body-parser middleware
app.use(express.urlencoded({extended:true}))

// Route handlers
app.use('/user',user)
app.use('/',common)
app.use('/',other)
app.use('/',itin)
app.use('/',search )
app.use('/auth',auth)
app.use('/itinerary', itineraryRoutes);
app.use('/api',rout)
// app.use('/',itn)

//const apiKey = process.env.GENERATIVE_AI_API_KEY;


app.get('/', (req, res) => {
    res.render('home');
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //const user = await userModel.findByEmail(email); // Find user by email
    const user = await userModel.findByemail(email)
    console.log(user)
    if (!user) {
      // User not found, handle the error
      return res.render('common/logins', { error: 'Invalid email or password' });
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
      
       res.redirect('/traveller_home' ); // Redirect to traveler_home page on successful login
      //return user;
    } else {
      res.render('common/logins', { error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.render('common/logins', { error: 'An error occurred' });
  }
});



// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};



// Profile page route
app.get('/profile', isAuthenticated, (req, res) => {
  const user = req.session.user; // Assuming user data is stored in the session
  res.render('profile', { user: user }); // Render the profile template
});

// app.post('/itinerary', itineraryController.handleItinerary);

const itineraryGenerator = require('./src/models/itineraryGenerator');

app.get('/generate-itinerary', (req, res) => {
  // Gather user inputs
  const duration = parseInt(req.query.duration);
  const budget = parseInt(req.query.budget);
  const preferences = req.query.preferences || {}; // Handle optional preferences

  // Call the itinerary generator
  const itinerary = itineraryGenerator(duration, budget, preferences);

  // Render the itinerary in a response (example using EJS)
  res.render('itinerary', { itinerary: itinerary });
});




// Error handling (optional)
app.use((err, req, res, next) => {
    // Handle errors here
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });


// Start the server
app.listen(process.env.PORT,() => console.log('Server listening on port 3005'));


