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
      name: "MUNNAR",
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
          time:"Throughout the day"
        },
        {
          name: "Boating in lake(Kundala Lake)",
          time: "Afternoon (Enjoy scenic views)"
        }
      ],guides: [
        {
          name: "Munnar Eco Guides",
          contact: "+91 94970 00000",
          specialties: ["Nature walks", "Wildlife spotting", "Trekking"],
        },
        {
          name: "Munnar Tourism Development Council",
          contact: "+91 4865 230002",
          specialties: ["Historical and cultural tours", "Local sightseeing"],
        },
      ],
      taxis: [
        {
          company: "Munnar Cabs",
          contact: "+91 94470 33444",
          website: "https://www.munnarcabs.com/",
        },
        {
          company: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "Sheela Restaurant",
          cuisine: "Keralan, South Indian",
          rating: 4.7,
          website: "https://www.zomato.com/munnar/sheela-restaurant-munnar-1",
        },
        {
          name: "East Winds Munnar",
          cuisine: "International, Indian",
          rating: 4.3,
          website: "https://www.zomato.com/munnar/east-winds-munnar-1",
        },
      ]
    },
    {
      name: "ALAPUZHA",
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
          time:"Throughout the day"
        }
      ],
      guides: [
        {
          name: "Alleppey Backwaters Tourism Development Cooperative Society (ABDT)",
          contact: "+91 477 223 6880",
          specialties: ["Backwater tours", "Cultural experiences", "Local history"],
        },
        {
          name: "Green Kaptain Backwaters",
          contact: "+91 94470 63434",
          specialties: ["Luxury houseboat experiences", "Birdwatching tours", "Ayurvedic treatments (onboard)"],
        },
      ],
      taxis: [
        {
          company: "Alleppey Cabs",
          contact: "+91 98460 88888",
          website: "https://www.alleppeycabs.com/",
        },
        {
          company: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "Karimeen Restaurant",
          cuisine: "Keralan, Seafood",
          rating: 4.8,
          website: "https://www.zomato.com/alleppey/karimeen-restaurant-aleppey-1",
        },
        {
          name: "Neerettukayal Restaurant",
          cuisine: "Keralan, Seafood",
          rating: 4.5,
          website: "https://www.zomato.com/alleppey/neerettukayal-restaurant-aleppey-1",
        },
      ]
    },
    {
      name: "KOVALAM",
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
          time:"Throughout the day"
        },
        {
          name:"Ayurvedic massage",
          time:"Throughout the day"
        }
      ],
      guides: [
        {
          name: "Kovalam Tourism Development Society (KTDS)",
          contact: "+91 471 230 2131",
          specialties: ["Beach activities", "Local history and culture", "Sightseeing tours"],
        },
        {
          name: "Ayurvedic Yoga Wellness",
          contact: "+91 98460 99888",
          specialties: ["Ayurvedic treatments", "Yoga classes", "Meditation retreats"],
        },
      ],
      taxis: [
        {
          company: "Kovalam Cabs",
          contact: "+91 8888 555 555",
          website: "https://www.kovalamcabs.com/", // Placeholder, replace with actual website if available
        },
        {
          name: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "Fusion Restaurant Kovalam",
          cuisine: "International, Seafood",
          rating: 4.6,
          website: "https://www.zomato.com/trivandrum/fusion-restaurant-kovalam-1",
        },
        {
          name: "Lighthouse Restaurant Kovalam",
          cuisine: "Keralan, Seafood",
          rating: 4.3,
          website: "https://www.zomato.com/trivandrum/lighthouse-restaurant-kovalam-1",
        },
      ]
    },
    {
      name: "THEKKADY",
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
          time:"Throughout the day"
        },
        {
          name: "Boat ride in Periyar lake",
          time: "Late afternoon (Increased chance of wildlife sightings)"
        }
      ],
      guides: [
        {
          name: "Periyar Tiger Trail",
          contact: "+91 94959 95959",
          specialties: ["Wildlife safaris", "Birdwatching tours", "Nature walks"],
        },
        {
          name: "Thekkady Jungle Guides Association",
          contact: "+91 468 222 5555",
          specialties: ["Responsible tourism practices", "Local wildlife knowledge", "Night safaris (optional)"],
        },
      ],
      taxis: [
        {
          company: "Thekkady Taxi Services",
          contact: "+91 90000 11222",
          website: "https://www.thekkadytaxiservices.com/",
        },
        {
          name: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        }
      ],
      restaurants: [
        {
          name: "Greenlands Restaurant",
          cuisine: "Keralan, Indian",
          rating: 4.2,
          website: "https://www.zomato.com/thekkady/greenlands-restaurant-thekkady-1",
        },
        {
          name: "Spice Junction Restaurant",
          cuisine: "Keralan, South Indian",
          rating: 4.4,
          website: "https://www.zomato.com/thekkady/spice-junction-restaurant-thekkady-1",
        },
      ]
    },
    {
      name: "WAYANAD",
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
          time:"Throughout the day"
        },
        {
          name:"Camping",
          time:"all time"
        },
        {
          name:"Ziplining (optional)",
          time:"Throughout the day"
        }
      ],
      guides: [
        {
          name: "Wayanad Adventure Club",
          contact: "+91 94479 00000",
          specialties: ["Trekking expeditions", "Wildlife spotting", "Camping tours"],
        },
        {
          name: "Wayanad Eco Guides",
          contact: "+91 88888 22333",
          specialties: ["Birdwatching tours", "Nature walks", "Local flora and fauna knowledge"],
        },
      ],
      taxis: [
        {
          company: "Wayanad Cabs",
          contact: "+91 98989 88777",
          website: "https://www.wayanadcabs.com/", // Placeholder, replace with actual website if available
        },
        {
          name: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "The Peppercorn Restaurant",
          cuisine: "Keralan, North Indian",
          rating: 4.5,
          website: "https://www.zomato.com/wayanad/the-peppercorn-restaurant-wayanad-1",
        },
        {
          name: "Cafe Mist",
          cuisine: "Multi-cuisine, Cafe",
          rating: 4.2,
          website: "https://www.zomato.com/wayanad/cafe-mist-wayanad-1",
        },
      ]
    },
    {
      name: "PERIYAR",
      category: "Wildlife",
      duration: 1,
      cost: 100,
      rating: 4.5,
      activities: [
        {
          name:"Boating in Periyar lake",
          time:"Throughout the day"
        },
        {
          name:"Tiger spotting (optional)",
          time:"Throughout the day"
        },
        {
          name: "Nature walk with guide",
          time: "Early morning (Spot nocturnal animals)"
        },
        {
          name:" mengunjungi desa adat (visiting tribal villages)", // local activity (assuming you're in Kerala),
          time:"Throughout the day"
        }
      ],
      guides: [
        {
          name: "Periyar Tiger Trail",
          contact: "+91 94959 95959",
          specialties: ["Wildlife safaris", "Birdwatching tours", "Nature walks"],
        },
        {
          name: "Thekkady Jungle Guides Association",
          contact: "+91 468 222 5555",
          specialties: ["Responsible tourism practices", "Local wildlife knowledge", "Night safaris (optional)"],
        },
      ],
      taxis: [
        {
          company: "Thekkady Taxi Services",
          contact: "+91 90000 11222",
          website: "https://www.thekkadytaxiservices.com/",
        },
        {
          company: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "Greenlands Restaurant",
          cuisine: "Keralan, Indian",
          rating: 4.2,
          website: "https://www.zomato.com/thekkady/greenlands-restaurant-thekkady-1",
        },
        {
          name: "Spice Junction Restaurant",
          cuisine: "Keralan, South Indian",
          rating: 4.4,
          website: "https://www.zomato.com/thekkady/spice-junction-restaurant-thekkady-1",
        },
      ]
    },
    {
      name: "VARKALA",
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
        time:"Throughout the day"},
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
      ],
      guides: [
        {
          name: "Varkala Tourism Development Cooperative Society (VTDC)",
          contact: "+91 471 246 3301",
          specialties: ["Sightseeing tours", "Cultural experiences", "Local history tours"],
        },
        {
          name: "Ayurvedic Bliss",
          contact: "+91 98465 78900",
          specialties: ["Ayurvedic treatments", "Yoga classes", "Meditation retreats"],
        },
      ],
      taxis: [
        {
          company: "Varkala Taxi Services",
          contact: "+91 88889 99000",
          website: "https://www.varkalataxiservices.com/", // Placeholder, replace with actual website if available
        },
        {
          name: "Keralataxi.com",
          contact: "+91 8888 888 888",
          website: "https://www.keralataxi.com/",
        },
      ],
      restaurants: [
        {
          name: "Clafouti Beach Restaurant",
          cuisine: "Seafood, European",
          rating: 4.7,
          website: "https://www.zomato.com/varkala/clafouti-beach-restaurant-varkala-1",
        },
        {
          name: "Indique Restaurant",
          cuisine: "Keralan, North Indian",
          rating: 4.5,
          website: "https://www.zomato.com/varkala/indique-restaurant-varkala-1",
        },
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


//const _ = require('lodash');
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
  const mutationRate = 0.2;


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
        let preferenceScore = 0;
for (const pref of preferences) {
  if (pref[0] === location.category) {
    preferenceScore += pref[1];
    break; // Exit the loop once the matching category is found
  }
}
        //preferenceScore += preferences.get(location.category, 0);
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
    score += preferenceScore * 200; // Lower weight on preference to avoid forcing inclusion
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

console.log("Best New Itinerary:");
let totalDays = 0;


const itinerary = [];
for (const location of bestItinerary) {
  if (totalDays + location.duration <= duration) {
    itinerary.push(location);
    console.log(`Name: ${location.name}, Category: ${location.category}`);
    console.log(`Duration: ${location.duration} days, Cost: ${location.cost}, Rating: ${location.rating}`);

    console.log("Activities:");
    for (const activity of location.activities) {
      console.log(`- ${activity.name} [ ${activity.time}]`);
    }

    console.log("Guides:");
    for (const guide of location.guides) {
      console.log(`- ${guide.name} (Contact: ${guide.contact}, Specialties: ${guide.specialties})`);
    }

    console.log("Taxis:");
    for (const taxi of location.taxis) {
      console.log(`- ${taxi.company} (Contact: ${taxi.contact}, Website: ${taxi.website || "NA"})`); // Use "NA" if website is unavailable
    }

    console.log("Restaurants:");
    for (const restaurant of location.restaurants) {
      console.log(`- ${restaurant.name} (Cuisine: ${restaurant.cuisine}, Rating: ${restaurant.rating}, Website: ${restaurant.website || "NA"})`); // Use "NA" if website is unavailable
    }

    totalDays += location.duration;
    console.log("------------------------"); // Separator between locations
  } else {
    break;
  }
}

return itinerary; // Return the generated itinerary

}


export default  generateItinerary;

// Example usage (set user preferences)
const preferences = new Map([
  ["Hill station", 3], // Weight of 3 for Hill stations
  ["Backwaters", 1],  // Weight of 1 for Backwaters
  ["Beach", 2],       // Weight of 2 for Beaches
  ["Wildlife", 0],   // Weight of 0 for Wildlife (not preferred)
]);

// const result = generateItinerary(4, 4500, preferences); // Call the function