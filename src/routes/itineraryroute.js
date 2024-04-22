import {Router} from "express";
const itin=Router();
import generateItinerary from "../models/itineraryGenerator";

itin.get('/getitineraopenai',async(req,res)=>{
    res.render('itinerary/getitineraopenai')
})


itin.get('/getitinera',async(req,res)=>{
    res.render('itinerary/getitinera')
})

itin.get('/getitinerai/',async(req,res)=>{
 res.render( 'itinerary/munnar'); 

})


itin.post('/itinera', async (req, res) => {
    const { duration, budget, preferences} = req.body;
  
    // Call your itinerary generation function here
    const result =  generateItinerary(duration, budget, preferences);
    res.json(result)
  });

  




export default itin;