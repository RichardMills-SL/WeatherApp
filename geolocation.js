/// <reference path="weather.js" />
// function to get geolocation
function callGeolocation() {
    var positionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximmumAge: 0
    }
    // Launch geolocation request
    navigator.geolocation.getCurrentPosition(
        geolocationSuccessCallback,
        geolocationFailureCallback,
        positionOptions
    )
   
    var latLong;
    function geolocationSuccessCallback(position) {
        // getting the latitude and longitudeL
        var latitude;
        var longitude;
        latitude = (position.coords.latitude).toFixed(4);
        longitude = (position.coords.longitude).toFixed(4);

        // add lat and long of the user to the page:
        document.getElementById("latLong").innerText = "Latitude: " + latitude + "; Longitude: " + longitude;

        latLong = "lat=" + latitude + "&lon=" + longitude;
        requestWeatherData(latLong); // calling function in the weather.js file
    }

    function geolocationFailureCallback(error) {
        alert("Geolocation error code " + error.code + ": " + error.message);
    }
    
}