import {Router} from "express";
const other=Router();


other.get('/traveller',async(req,res)=>{
    res.render('traveller/trav_signup')
})
other.post('/auth/traveller/traveller_home',async(req,res)=>{
    res.render('traveller/traveller_home')
})

other.get('/guide',async(req,res)=>{
    res.render('guide/guide')
})


other.get('/taxi_driver',async(req,res)=>{
    res.render('taxi/taxi_driver')
})


other.get('/hotel',async(req,res)=>{
    res.render('hotel/hotel')
})


other.get('/activities',async(req,res)=>{
    res.render('activities/activities')
})


other.get('/admin_home',async(req,res)=>{
    res.render('admin/admin_home')
})

other.get('/activities_home',async(req,res)=>{
    res.render('activities/activities_home')
})

other.get('/guide_home',async(req,res)=>{
    res.render('guide/guide_home')
})

other.get('/hotel_home',async(req,res)=>{
    res.render('hotel/hotel_home')
})

other.get('/taxi_home',async(req,res)=>{
    res.render('taxi/taxi_home')
})


other.get('/traveller_home', async (req, res) => {
    try {
      const user = req.session.user; // Retrieve user from session
      if (!user) {
        // User not logged in, redirect to login or handle error
        return res.redirect('/login'); // Example redirect
      }
      const { name, email } = user; // Extract specific properties
      res.render('traveller/traveller_home', { name, email }); // Render template with user data
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.render('error', { error: 'An error occurred' }); // Render an error template
    }
  });
  

other.get('/admin_dashboard',async(req,res)=>{
    res.render('admin/admin_dashboard')
})


other.get('/manage_users',async(req,res)=>{
    res.render('admin/manage_users')
})

other.get('/manage_content',async(req,res)=>{
    res.render('admin/manage_content')
})

other.get('/settings',async(req,res)=>{
    res.render('admin/settings')
})


other.get('/itinerary',async(req,res)=>{
    res.render('itinerary')
})


other.get('/generate_itinera',async(req,res)=>{
    res.render('itinerary/generateitinerary')
})

export default other;