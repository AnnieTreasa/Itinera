const locations = [
  {
    Name: "Munnar",
    Category: "Hill station",
    Duration: 2,
    Cost: 100,
    Rating: 4.5,
  },
  {
    Name: "Alleppey",
    Category: "Backwaters",
    Duration: 1,
    Cost: 80,
    Rating: 4.0,
  },
  {
    Name: "Kovalam",
    Category: "Beach",
    Duration: 2,
    Cost: 120,
    Rating: 4.2,
  },
  {
    Name: "Thekkady",
    Category: "Wildlife",
    Duration: 1,
    Cost: 70,
    Rating: 4.7,
  },
  {
    Name: "Wayanad",
    Category: "Hill station",
    Duration: 2,
    Cost: 150,
    Rating: 4.8,
  },
  {
    Name: "Periyar",
    Category: "Wildlife Sanctuary",
    Duration: 1,
    Cost: 100,
    Rating: 4.5,
  },
  {
    Name: "Varkala",
    Category: "Beach",
    Duration: 0.5,
    Cost: 80,
    Rating: 4.7,
  }
];

function generateItinerary(duration, budget, preferences) {
  const itinerary = [];
  
  function backtrack(index, currentDuration, currentCost, currentItinerary) {
    if (currentDuration > duration || currentCost > budget) {
      return false; // Constraint violation, backtrack
    }
    
    if (index >= locations.length) {
      // Solution found
      if (currentDuration === duration && currentCost <= budget) {
        itinerary.push(currentItinerary.slice());
        return true;
      }
      return false;
    }
    
    // Try adding the location
    const location = locations[index];
    const categoryWeight = preferences.get(location.Category) || 0;
    if (backtrack(index + 1, currentDuration + location.Duration, currentCost + location.Cost, [...currentItinerary, location]) ||
        categoryWeight > 0 && backtrack(index + 1, currentDuration, currentCost, currentItinerary)) {
      return true;
    }
    
    return false;
  }
  
  backtrack(0, 0, 0, []);
  
  return itinerary;
}

// Example usage (set user preferences)
const preferences = new Map([
  ["Hill station", 3], // Weight of 3 for Hill stations
  ["Backwaters", 1],  // Weight of 1 for Backwaters
  ["Beach", 2],       // Weight of 2 for Beaches
  ["Wildlife", 0],   // Weight of 0 for Wildlife (not preferred)
]);

const itineraries = generateItinerary(5, 450, preferences);
console.log("Generated Itineraries:");
for (const itinerary of itineraries) {
  console.log("----");
  for (const location of itinerary) {
    console.log(`Name: ${location.Name}, Category: ${location.Category}, Duration: ${location.Duration} days, Cost: ${location.Cost}, Rating: ${location.Rating}`);
  }
}
