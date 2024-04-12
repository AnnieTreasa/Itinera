const driver = require('../../db');

async function createSession() {
    const session = driver.session({ autoCommit: false });
    return session;
  }

  async function findPOIs(location, category) {
    const session = await createSession();
    try {
      const result = await session.run(`
        MATCH (poi:PointOfInterest { location: $location, category: $category })
        RETURN poi
      `, { location, category });
      const pois = result.records.map(record => record.get('poi').properties);
      return pois;
    } finally {
      await session.close();
    }
  }

  async function getTravelTime(origin, destination) {
    const axios = require('axios'); // Assuming you already have axios installed
  
    const url = new URL('https://maps.googleapis.com/maps/api/directions/json');
    url.searchParams.append('origin', origin);
    url.searchParams.append('destination', destination);
    url.searchParams.append('key', process.env.GOOGLE_MAPS_API_KEY);
    url.searchParams.append('mode', 'driving'); // You can specify other travel modes here
  
    try {
      const response = await axios.get(url.toString());
      const data = response.data;
      
      if (data.status === 'OK') {
        const travelTime = data.routes[0].legs[0].duration.value; // Access travel time in seconds from the response
        return travelTime;
      } else {
        console.error('Error fetching travel time:', data.error_message);
        return null; // Or handle the error differently
      }
    } catch (error) {
      console.error('Error fetching travel time:', error);
      return null;
    }
  }

  async function findTravelTime(fromLocation, toLocation) {
    const travelTime = await getTravelTime(fromLocation, toLocation);
    return travelTime;
  }
  
export default{
    findTravelTime,
    getTravelTime,
    findPOIs
}  
  