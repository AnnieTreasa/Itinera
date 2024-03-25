import express from 'express'
import user from './src/routes/user'
import itinerary from './src/models/itinerary'
import other from './src/routes/others'
import routes from './src/routes/authRoutes'
import itin from './src/routes/itineraryroute'
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser');


require('dotenv').config()
const app = express()

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(authRoutes)
app.use(other)
app.use(itin)
app.use(cookieParser());



app.use(express.urlencoded({extended:true}))
//app.use('/',user)
app.get('/', (req, res) => {
    res.render('trav_home');
});

app.listen(process.env.PORT)