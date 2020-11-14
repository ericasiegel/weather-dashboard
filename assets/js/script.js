// form variables
let userFormEl = document.querySelector("#user-form");
let locationInputEl = document.querySelector("#location");

// location list variables
let locationResults = document.querySelector("#location-search-results");

// Main weather content variables
let locationName = document.querySelector(".location-name");
let todaysDate = document.querySelector(".date");
let weatherIcon = document.querySelector(".icon");
let locationTemp = document.querySelector(".location-temp");
let locationHumidity = document.querySelector(".location-humid");
let locationWind = document.querySelector(".location-wind");
let locationUv = document.querySelector(".location-uv");

// 5 day forecast variables
let fiveDayForecast = document.querySelector("#five-day-forecast");

// API key variable and Unit option
let apiKey = "&appid=42ed08cbc3e418fb0ee6724facf8348a&units=imperial"




// form submit
let formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from location input
    let locationName = locationInputEl.value.trim();

    if (locationName) {
        getLocation(locationName);
        locationInputEl.value = "";
    }
    else {
        alert("Please enter a location");
    }
};

// get the location from API
let getLocation = function(location) {
    // format the weather API
    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + apiKey;
}

// button event listener
userFormEl.addEventListener("submit", formSubmitHandler);