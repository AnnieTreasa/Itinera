function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    if (position.coords) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.altitude || 'Not available';
        console.log("Latitude: " + latitude + " Longitude: " + longitude + " Altitude: " + altitude);
        sendToServer(latitude, longitude, altitude);
    } else {
        console.log("Location information is not available.");
    }
}
function sendToServer(latitude, longitude, altitude) {
    var xhr = new XMLHttpRequest();
    var url = '/location?lat=' + latitude + '&long=' + longitude + '&alt=' + altitude;
    xhr.open('GET', url, true);
    xhr.send();
}

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is not available.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}