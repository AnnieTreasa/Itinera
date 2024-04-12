import {Router} from "express";
const common=Router();


common.get('/about',async(req,res)=>{
    res.render('common/abouts')
})

common.get('/explore',async(req,res)=>{
    res.render('common/explore')
})

common.get('/profile', async (req,res)=>{
   
  res.render("common/profile")
})

common.get('/result', async (req,res)=>{
   
  res.render("result")
})

common.get('/login',async(req,res)=>{
    res.render('common/logins')
})


const apiKey = 'AIzaSyBuMGFCVwJASWb-3OR4ys86mUSpw3aL0lQ';
common.post('/search-places', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const location = req.body.location;  // Optional: Pre-filled location if needed
  
    try {
      const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
      url.searchParams.append('query', searchTerm);
      url.searchParams.append('location', location || ''); // Use pre-filled location or empty string
      url.searchParams.append('radius', 500);  // Optional: Radius in meters (default 500)
      url.searchParams.append('key', apiKey);
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const places = data.results.map(place => ({
          name: place.name,
          address: place.formatted_address,
          location: place.geometry.location,
          rating: place.rating || null,
          icon: place.icon || null
        }));
        res.render('search-results', { places }); // Render search results template
      } else {
        console.error('Places API error:', data.status);
        res.render('search-results', { error: 'Error searching places' }); // Render error message
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      res.render('search-results', { error: 'Error fetching places' }); // Render error message
    }
  });

export default common;