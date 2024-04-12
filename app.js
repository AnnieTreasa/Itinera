
import express from 'express'
const session = require('express-session');
import user from './src/routes/user'
import other from './src/routes/others'
import common from './src/routes/common'
import itin from './src/routes/itineraryroute'
import auth from './src/routes/authRoutes'
import rout from './src/routes/tripadvisor'
import search from './src/routes/search';
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


