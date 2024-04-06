
import express from 'express'
const session = require('express-session');
import user from './src/routes/user'
import other from './src/routes/others'
import common from './src/routes/common'
import itin from './src/routes/itineraryroute'
import auth from './src/routes/authRoutes'
import rout from './src/routes/tripadvisor'
import { getPlacesData, getWeatherData } from './src/api/travelAdvisorAPI';
const itineraryRoutes = require('./src/routes/itinerary');
//const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');


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
app.use('/auth',auth)
app.use('/itinerary', itineraryRoutes);
app.use('/api',rout)

app.get('/', (req, res) => {
    res.render('home');
});

// Error handling (optional)
app.use((err, req, res, next) => {
    // Handle errors here
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// Start the server
app.listen(process.env.PORT,() => console.log('Server listening on port 3005'));


