const axios = require('axios'); // For making HTTP requests
const geopy = require('geopy'); // For distance calculation
const _ = require('lodash'); // Utility library
//const geopy = require('geopy');

const googleMapsLinkPrefix = 'https://www.google.com/maps/dir/?api=1&origin=';

// Function to handle geocoding addresses using a third-party API (replace with your preferred service)
async function geocodeAddress(address) {
  const url = `https://your-geocoding-api.com/api?address=${address}`; // Replace with your API URL
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0];
      return {
        address,
        latitude: firstResult.geometry.location.lat,
        longitude: firstResult.geometry.location.lng,
      };
    } else {
      console.error(`Geocode failed for address: ${address}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return null;
  }
}

// Function to calculate distance between two coordinates
function calculateDistance(origin, destination) {
  const geocoder = new geopy.distance.Geodesic();
  return geocoder.measure(origin, destination); // Returns distance in kilometers
}

// Function to create a distance matrix for all locations
function createDistanceMatrix(locations) {
  const numLocations = locations.length;
  const distanceMatrix = [];
  for (let i = 0; i < numLocations; i++) {
    distanceMatrix[i] = [];
    for (let j = 0; j < numLocations; j++) {
      if (i === j) {
        distanceMatrix[i][j] = 0; // Distance to itself is 0
      } else {
        const distance = calculateDistance(locations[i], locations[j]);
        distanceMatrix[i][j] = distance;
        distanceMatrix[j][i] = distance; // Distance is symmetrical
      }
    }
  }
  return distanceMatrix;
}

// Function to convert distance to miles
function convertDistanceToMiles(distanceInKm) {
  return distanceInKm * 0.621371;
}

// Function to format distance for display
function formatDistance(distance) {
  const distanceKm = distance.toFixed(2);
  const distanceMi = convertDistanceToMiles(distance).toFixed(2);
  return `<span class="math-inline">\{distanceKm\} km \(\~</span>{distanceMi} mi)`;
}

// Function to implement the Traveling Salesman Problem (TSP) algorithm
function tspSolver(distanceMatrix) {
  // Implement your chosen TSP algorithm here (e.g., Simulated Annealing)
  // This example uses a simple nearest neighbor approach for demonstration purposes
  // Replace with a more efficient algorithm for larger datasets
  const numLocations = distanceMatrix.length;
  const visited = new Array(numLocations).fill(false);
  const route = [0]; // Start at the first location

  for (let i = 1; i < numLocations; i++) {
    let minDistance = Infinity;
    let minIndex = -1;
    for (let j = 0; j < numLocations; j++) {
      if (!visited[j] && distanceMatrix[route[route.length - 1]][j] < minDistance) {
        minDistance = distanceMatrix[route[route.length - 1]][j];
        minIndex = j;
      }
    }
    visited[minIndex] = true;
    route.push(minIndex);
  }

  return route;
}

async function handleItinerary(req, res) {
    try {
      const selectedLocations = req.body.locations.split('\n').map(line => line.trim());
  
      // Geocode addresses to get coordinates
      const locationsWithCoords = await Promise.all(selectedLocations.map(geocodeAddress));
      const validLocations = locationsWithCoords.filter(location => location !== null); // Filter out failed geocodes
  
      if (validLocations.length === 0) {
        return res.status(400).send('Error: No valid locations found. Please check your entries.');
      }
  
      // Extract coordinates from valid locations
      const locations = validLocations.map(location => [location.latitude, location.longitude]);
  
      // Create distance matrix
      const distanceMatrix = createDistanceMatrix(locations);
  
      // Solve TSP algorithm to find optimal route
      const optimalRoute = tspSolver(distanceMatrix);
  
      // Calculate total distance and individual leg distances
      let totalDistance = 0;
      const legDistances = [];
      for (let i = 0; i < optimalRoute.length - 1; i++) {
        const distance = distanceMatrix[optimalRoute[i]][optimalRoute[i + 1]];
        totalDistance += distance;
        legDistances.push(formatDistance(distance));
      }
  
      // Prepare data for EJS template
      const itineraryData = {
        locations: validLocations.map(location => location.address),
        optimalRoute,
        totalDistance: formatDistance(totalDistance),
        legDistances,
        googleMapsLink: googleMapsLinkPrefix + _.join(validLocations.map(loc => loc.address), '%7C'), // Build Google Maps link
      };
  
      // Render the itinerary EJS template
      res.render('itinerary', itineraryData);
    } catch (error) {
      console.error('Error processing itinerary:', error);
      res.status(500).send('Error generating itinerary. Please try again.');
    }
  }
  

module.exports = {
  geocodeAddress,
  calculateDistance,
  createDistanceMatrix,
  convertDistanceToMiles,
  formatDistance,
  tspSolver,
  handleItinerary,
};
