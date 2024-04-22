// import generateItinerary from "../../src/models/itineraryGenerator";

const form = document.getElementById('itineraryForm');
const itineraryContainer = document.getElementById('itinerary');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input values
  const duration = parseInt(document.getElementById('duration').value);
  const budget = parseInt(document.getElementById('budget').value);

  // Create a Map to store user preferences (weight for each category)
  const preferences = new Map();
  const categories = document.querySelectorAll('input[name="category"]');
  for (const category of categories) {
    const weight = parseInt(category.parentElement.querySelector('select').value);
    preferences.set(category.value, weight);
  }

  // Generate the itinerary using the generateItinerary function
  const itinerary = generateItinerary(duration, budget, preferences);

  // Clear the itinerary container before displaying new results
  itineraryContainer.innerHTML = "";

  // Create HTML elements to display the itinerary
  const itineraryHeading = document.createElement('h2');
  itineraryHeading.textContent = "Your Kerala Itinerary:";
  itineraryContainer.appendChild(itineraryHeading);

  if (itinerary.length === 0) {
    // Handle no itinerary found scenario
    const noResults = document.createElement('p');
    noResults.textContent = "No itinerary found that meets your criteria. Please adjust your preferences and try again.";
    itineraryContainer.appendChild(noResults);
  } else {
    // Loop through each location in the itinerary and create HTML elements
    for (const location of itinerary) {
      const locationContainer = document.createElement('div');
      locationContainer.classList.add('location');

      const locationName = document.createElement('h3');
      locationName.textContent = location.name;
      locationContainer.appendChild(locationName);

      const locationDetails = document.createElement('p');
      locationDetails.innerHTML = `Category: ${location.category}, Duration: ${location.duration} days, Cost: ${location.cost}, Rating: ${location.rating}`;
      locationContainer.appendChild(locationDetails);

      // Add activities section if available
      if (location.activities.length > 0) {
        const activitiesHeading = document.createElement('h4');
        activitiesHeading.textContent = "Activities:";
        locationContainer.appendChild(activitiesHeading);

        const activitiesList = document.createElement('ul');
        for (const activity of location.activities) {
          const activityItem = document.createElement('li');
          activityItem.textContent = `- ${activity.name} [${activity.time}]`;
          activitiesList.appendChild(activityItem);
        }
        locationContainer.appendChild(activitiesList);
      }

      itineraryContainer.appendChild(locationContainer);
    }
  }
});
