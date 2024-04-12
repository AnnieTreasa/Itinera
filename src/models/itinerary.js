

const neo4jDriver = require('neo4j-driver');
require('dotenv').config()
const {
    url,
    db_username,
    db_password
}=process.env


const driver = neo4jDriver.driver(url, neo4jDriver.auth.basic(db_username, db_password));
const session = driver.session();



// Function to retrieve all cities
const findAllCities = async () => {
    const result = await session.run(`MATCH (c:City) RETURN c`);
    return result.records.map(record => record.get('c').properties);
};

// Function to retrieve all activities
const findAllActivities = async () => {
    const result = await session.run(`MATCH (a:Activity) RETURN a`);
    return result.records.map(record => record.get('a').properties);
};

// Function to retrieve all cities and their associated activities
const findCitiesAndActivities = async () => {
    const result = await session.run(`
        MATCH (c:City)-[:HAS_ACTIVITY]->(a:Activity)
        RETURN c, COLLECT(a) AS activities
    `);
    return result.records.map(record => ({
        city: record.get('c').properties,
        activities: record.get('activities').map(activity => activity.properties)
    }));
};

export default {
    findAllCities,
    findAllActivities,
    findCitiesAndActivities
};


async function generateItinerary(destination, startDate, numberOfDays, budget, travelType) {
  
    // Build your Cypher query to fetch relevant data
    const query = `
      MATCH (p:Place {name: $destination})
      RETURN p, ... // Add more properties or relationships
    `;
  
    // Execute the query and retrieve results
    const results = await session.run(query, { destination });
  
    // Process the results and create the itinerary structure
    const itinerary = {
      destination,
      startDate,
      numberOfDays,
      budget,
      travelType,
      // Add itinerary details like:
      days: [],
      activities: [],
      transportation: [],
      //...
    };
  
    // ... Perform logic to populate itinerary details using retrieved data, budget, travelType, etc.
  
    // Close the Neo4j session
    await session.close();
    await driver.close();
  
    return itinerary;
  }

  
