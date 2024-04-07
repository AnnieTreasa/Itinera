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
  },
  {
    name: "Alleppey",
    category: "Backwaters",
    duration: 1,
    cost: 80,
    rating: 4.0,
  },
  {
    name: "Kovalam",
    category: "Beach",
    duration: 2,
    cost: 120,
    rating: 4.2,
  },
  {
    name: "Thekkady",
    category: "Wildlife",
    duration: 1,
    cost: 70,
    rating: 4.7,
  },
  {
    name: "Wayanad",
    category: "Hill station",
    duration: 2,
    cost: 150,
    rating: 4.8,
   }
  ,
  {
  name: "Periyar",
  category: "Wildlife",
  duration: 1,
  cost: 100,
  rating: 4.5
  },
  {
  name: "Varkala",
  category: "Beach",
  duration: 0.5,
  cost: 80,
  rating: 4.7
  }
  
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

  // Function to calculate fitness score
  function fitness(chromosome) {
    let score = 0;
    let totalDuration = 0;
    let totalCost = 0;
    let preferenceScore = 0;

    for (const location of chromosome) {
      totalDuration += location.duration;
      totalCost += location.cost;
      preferenceScore += preferences.get(location.category, 0);
    }

    // Penalties for exceeding duration or budget
    score -= Math.abs(totalDuration - duration) * 2;
    score -= Math.abs(totalCost - budget) * 1.5;
    score += preferenceScore * 3; // Weight preference score

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

  // Display the itinerary
  console.log("Best Itinerary:");
  for (const location of bestItinerary) {
    console.log(`Name: ${location.name}, Category: ${location.category}, Duration: ${location.duration} days, Cost: ${location.cost}, Rating: ${location.rating}`);
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