import {Router} from "express";
const itin=Router();

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
    const { destination, startDate, numberOfDays, budget, travelType } = req.body;
  
    // Call your itinerary generation function here
    const itinerary = await generateItinerary(destination, startDate, numberOfDays, budget, travelType);
  
    // Render the itinerary using EJS
    res.render('itinerary/itinera', { itinerary });
  });

  




export default itin;