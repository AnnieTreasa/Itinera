const category =[
  "Backwater"
, "Forts and Palaces","Hills", "Waterfalls", "Beaches", "Places of interest", "Picnic spots", "Wildlife" ,"Monuments", "Museums", "Pilgrim Centers" 
]
const category_details = [
  { name: "Backwater", duration: 4, cost: 100 },
  { name: "Forts and Palaces", duration: 3, cost: 80 },
  { name: "Hills", duration: 6, cost: 120 },
  { name: "Waterfalls", duration: 2, cost: 50 },
  { name: "Beaches", duration: 5, cost: 90 },
  { name: "Places of interest", duration: 3, cost: 70 },
  { name: "Picnic spots", duration: 2, cost: 40 },
  { name: "Wildlife", duration: 4, cost: 80 },
  { name: "Monuments", duration: 3, cost: 70 },
  { name: "Museums", duration: 2, cost: 60 },
  { name: "Pilgrim Centers", duration: 3, cost: 70 }
];


const locations = [

    {
      name: "Munnar",
      category: "Hill station",
      duration: 2,
      cost: 100,
      rating: 4.5,
      activities: [
        {
          name: "Hiking",
          time: "Morning (Choose a suitable time range)" // Adjust time range based on preference
        },
        {
          name:"Sightseeing (Photo points)",
          time:"all time"
        },
        {
          name: "Boating in lake(Kundala Lake)",
          time: "Afternoon (Enjoy scenic views)"
        }
      ]
    },
    {
      name: "Alleppey",
      category: "Backwaters",
      duration: 1,
      cost: 80,
      rating: 4.0,
      activities: [
        {
          name: "Houseboat cruise",
          time: "Start midday (Enjoy lunch on board)" // Adjust time based on preference
        },
        {
          name:"Local village visit",
          time:"all time"
        }
      ]
    },
    {
      name: "Kovalam",
      category: "Beach",
      duration: 2,
      cost: 120,
      rating: 4.2,
      activities: [
        {
          name:"Sunbathing",
          time:"morning and evening"
        },
        {
          name: "Surfing lessons (optional)",
          time: "Morning (Ideal wave conditions)" // Adjust time based on season
        },
        {
          name:"Catamaran sailing",
          time:"all time"
        },
        {
          name:"Ayurvedic massage",
          time:"all time"
        }
      ]
    },
    {
      name: "Thekkady",
      category: "Wildlife",
      duration: 1,
      cost: 70,
      rating: 4.7,
      activities: [
        {
          name: "Elephant ride (ethical operators recommended)",
          time: "Early morning (Pleasant weather for animals)"
        },
        {
          name:"Jeep safari",
          time:"all time"
        },
        {
          name: "Boat ride in Periyar lake",
          time: "Late afternoon (Increased chance of wildlife sightings)"
        }
      ]
    },
    {
      name: "Wayanad",
      category: "Hill station",
      duration: 2,
      cost: 150,
      rating: 4.8,
      activities: [
        {
          name: "Trekking (various difficulty levels)",
          time: "Morning (Cooler temperatures)"
        },
        {
          name:"Bird watching",
          time:"all time"
        },
        {
          name:"Camping",
          time:"all time"
        },
        {
          name:"Ziplining (optional)",
          time:"all time"
        }
      ]
    },
    {
      name: "Periyar",
      category: "Wildlife",
      duration: 1,
      cost: 100,
      rating: 4.5,
      activities: [
        {
          name:"Boating in Periyar lake",
          time:"all time"
        },
        {
          name:"Tiger spotting (optional)",
          time:"all time"
        },
        {
          name: "Nature walk with guide",
          time: "Early morning (Spot nocturnal animals)"
        },
        {
          name:" mengunjungi desa adat (visiting tribal villages)", // local activity (assuming you're in Kerala),
          time:"all time"
        }
      ]
    },
    {
      name: "Varkala",
      category: "Beach",
      duration: 1,
      cost: 80,
      rating: 4.7,
      activities: [
        {
          name: "Cliff diving (with caution and at designated spots)",
          time: "Not applicable (Choose a safe time based on conditions)" // Informative placeholder
        },
        {name:"Paragliding (optional)",
        time:"all time"},
         // Time depends on operator availability (already mentioned)
        {
          name: "Ayurvedic massage",
          time: "Morning or Afternoon (Choose based on preference)"
        },
        {
          name: "Visiting Janardhana Swami Temple",
          time: "Mid-morning (Avoid peak heat)"
        },
        {
          name: "Sunbathing",
          time: "Morning (Less crowded)" // Assuming sunbathing is a potential activity
        },
        {
          name: "Exploring local markets",
          time: "Midday (Enjoy the vibe)" // Assuming exploring markets is a potential activity
        },
        {
          name: "Relaxing by the beach",
          time: "Throughout the day" // Flexible activity
        }
      ]
    }
    
    
  ];
  

const distanceMatrix = [
  [0, 150, 280, 180, 100, 230, 310], // Kovalam
  [150, 0, 130, 100, 200, 250, 330], // Thekkady
  [280, 130, 0, 80, 300, 180, 380], // Wayanad
  [180, 100, 80, 0, 150, 200, 280], // Periyar
  [100, 200, 300, 150, 0, 250, 330], // Varkala
  [230, 250, 180, 200, 250, 0, 180], // Munnar
  [310, 330, 380, 280, 330, 180, 0]   // Alleppey
];


const _ = require('lodash');
function shuffle(array) {
  const shuffled = [...array]; // Create a copy to avoid modifying the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function generateItinerary(duration, budget, preferences) {
  // Hyperparameters
  const populationSize = 10;
  const mutationRate = 0.1;


  function fitness(chromosome) {
    let score = 0;
    let totalDuration = 0;
    let totalCost = 0;
    let totalDistance = 0; 
    let preferenceScore = 0;
    const visitedLocations = new Set(); // Keep track of visited locations
  
    for (const location of chromosome) {
      if (!visitedLocations.has(location.name)) { // Check if location visited before
        visitedLocations.add(location.name);
        totalDuration += location.duration;
        totalCost += location.cost;
        preferenceScore += preferences.get(location.category, 0);
        // Calculate distance penalty (replace 2 with a suitable weight)
    if (chromosome.indexOf(location) > 0) { // Avoid penalty for the first location
      const previousLocation = chromosome[chromosome.indexOf(location) - 1];
      totalDistance += distanceMatrix[locations.indexOf(previousLocation)][locations.indexOf(location)];
    }
  
      }
    }
    let activityScore = 0;
    for (const location of chromosome) {
      activityScore += location.activities.length; // Simple example, consider user preferences
    }
  
    score += activityScore;
  
    // Penalties
    score -= Math.abs(totalDuration - duration) * 3; // Higher penalty for exceeding duration
    score -= Math.abs(totalCost - budget) * 1.5;
    score += preferenceScore * 2; // Lower weight on preference to avoid forcing inclusion
    score -= totalDistance * 0.1; // Penalize for higher total distance
    return score;
  }
  

  // Generate random population
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(shuffle(locations.slice())); // Shuffle a copy of locations
  }

  // Main GA loop
  for (let generation = 0; generation < 10; generation++) {
    // Selection (higher fitness scores get picked more often)
    const selected = population.sort((a, b) => fitness(b) - fitness(a)).slice(0, populationSize / 2);

    // Crossover (combine parents to create children)
    const children = [];
    for (let i = 0; i < populationSize / 2; i++) {
      const parent1 = selected[Math.floor(Math.random() * selected.length)];
      const parent2 = selected[Math.floor(Math.random() * selected.length)];
      const crossoverPoint = Math.floor(Math.random() * parent1.length);
      children.push(parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint)));
      children.push(parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint)));
    }

    // Mutation (randomly swap locations)
    for (let i = 0; i < children.length; i++) {
      if (Math.random() < mutationRate) {
        const index1 = Math.floor(Math.random() * children[i].length);
        const index2 = Math.floor(Math.random() * children[i].length);
        [children[i][index1], children[i][index2]] = [children[i][index2], children[i][index1]];
      }
    }

    // Combine children with parents for next generation
    population = population.concat(children);
  }

  // Pick the best itinerary from final population
  const bestItinerary = population.sort((a, b) => fitness(b) - fitness(a))[0];

//   // Display the itinerary
//   console.log("Best Itinerary:");
//   let totalDays = 0; // Initialize totalDays outside the loop

// for (const location of bestItinerary) {
//   if (totalDays + location.duration <= duration) {
//     console.log(`Name: ${location.name}, Category: ${location.category}, Duration: ${location.duration} days, Cost: ${location.cost}, Rating: ${location.rating}`);
//     totalDays += location.duration;
//   } else {
//     break;
//   }
// }
console.log("Best Itinerary:");
let totalDays = 0;

for (const location of bestItinerary) {
  if (totalDays + location.duration <= duration) {
    console.log(`Name: ${location.name}, Category: ${location.category}, Duration: ${location.duration} days, Cost: ${location.cost}, Rating: ${location.rating}`);
    console.log("Activities:");
    for (const activity of location.activities) {
      console.log(`- ${activity.name}`);
    }
    totalDays += location.duration;
  } else {
    break;
  }
}

}


// Example usage (set user preferences)
const preferences = new Map([
  ["Hill station", 3], // Weight of 3 for Hill stations
  ["Backwaters", 1],  // Weight of 1 for Backwaters
  ["Beach", 2],       // Weight of 2 for Beaches
  ["Wildlife", 0],   // Weight of 0 for Wildlife (not preferred)
]);

const result = generateItinerary(5, 4500, preferences); // Call the function