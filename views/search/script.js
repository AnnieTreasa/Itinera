const locationInput = document.getElementById('location-search');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

// Replace 'YOUR_TRIPADVISOR_API_KEY' with your actual API key (important!)
const apiKey = '86865F4DDFC242BBAF4C6882EBA29058'; 

searchButton.addEventListener('click', async () => {
  const searchTerm = locationInput.value.trim();

  console.log(searchTerm); // Logs the entered search term

  if (!searchTerm) {
    alert('Please enter a location to search.');
    return;
  }

  const options = {
    method: 'GET',
    url: `https://api.content.tripadvisor.com/api/v1/location/search?language=en&key=${apiKey}&term=${searchTerm}`,
    headers: { accept: 'application/json' }
  };

  try {
    const response = await axios.request(options);
    const locations = response.data.data;

    resultsDiv.innerHTML = ''; // Clear previous results before displaying new ones

    if (locations.length === 0) {
      resultsDiv.textContent = 'No locations found for your search.';
    } else {
      let resultsList = '<ul>';
      for (const location of locations) {
        resultsList += `<li>${location.name}</li>`;
      }
      resultsList += '</ul>';
      resultsDiv.innerHTML = resultsList;
    }
  } catch (error) {
    console.error(error);
    resultsDiv.textContent = 'An error occurred during the search.';
  }
});
