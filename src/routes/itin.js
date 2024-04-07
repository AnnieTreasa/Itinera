import {Router} from "express";
//import userModel from '../models/user'
const itin=Router()

const neo4jDriver = require('neo4j-driver');
require('dotenv').config()

const {
    url,
    db_username,
    db_password
}=process.env
const driver = neo4jDriver.driver(url, neo4jDriver.auth.basic(db_username, db_password));
const session = driver.session();

itin.post('/itinerary', async (req, res) => {
    const location = req.body.location; // Assuming location is retrieved from form data
  
    // Check Neo4j for the place
    const queryResult = await session.run(`
      MATCH (p:Place {name: $location})
      RETURN p
    `, { location });
  
    const existingPlace = queryResult.records.length > 0;
    await session.close();
  
    if (existingPlace) {
      // Location found, proceed to itinerary planning (logic not shown here)
      res.send("Itinerary planned based on existing data!"); // Replace with actual logic
    } else {
      // Location not found, use Tripadvisor API
      try {
        const activities = await getActivitiesFromTripadvisor(location);
        await createActivitiesInNeo4j(activities);
        // Now location data exists, proceed to itinerary planning (logic not shown here)
        res.send("Itinerary planned using data from Tripadvisor!"); // Replace with actual logic
      } catch (error) {
        console.error("Error fetching data from Tripadvisor:", error);
        res.status(500).send("Internal Server Error!");
      }
    }
  });


export default itin;