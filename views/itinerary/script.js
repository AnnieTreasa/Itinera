import generateItinerary from "../../src/models/itineraryGenerator";


const form = document.getElementById('itineraryForm');
const itineraryContainer = document.getElementById('itinerary');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const duration = parseInt(document.getElementById('duration').value);
  const budget = parseInt(document.getElementById('budget').value);

  // Create a Map to store user preferences (weight for each category)
  const preferences = new Map();
  const categories = document.querySelectorAll('input[name="category"]:checked');
  for (const category of categories) {
    const weight = parseInt(category.parentElement.querySelector('select').value);
    preferences.set(category.value, weight);
  }

  // Call the generateItinerary function and display the result in the itinerary container
  const itinerary = generateItinerary(duration, budget, preferences);
  itineraryContainer.innerHTML = itinerary;
});
