// form variables
let userFormEl = document.querySelector("#user-form");
let locationInputEl = document.querySelector("#location");
let locationBtnEl = document.querySelector("#button-addon2");

// location list variables
let locationResultsEl = document.querySelector("#location-search-results");

// Main weather content variables
let locationNameEl = document.querySelector(".location-name");
let todaysDateEl = document.querySelector(".date");
let weatherIconEl = document.querySelector(".icon");
let locationTempEl = document.querySelector(".location-temp");
let locationHumidityEl = document.querySelector(".location-humid");
let locationWindEl = document.querySelector(".location-wind");
let locationUvEl = document.querySelector(".location-uv");
let locationIconEl = document.querySelector(".icon");

// 5 day forecast variables
let fiveDayForecastEl = document.querySelector("#five-day-forecast");

// API key variable and Unit option
let apiKey = "&appid=42ed08cbc3e418fb0ee6724facf8348a&units=imperial"

// get the request from the weather API
let getCityLocation = function(city) {
    // format weather API url
    let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    // make a request to the url
    fetch(weatherApiUrl)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
       
    });
};

// form handler to submit user location
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    let cityLocation = locationInputEl.value.trim();
    if (cityLocation) {
        getCityLocation(cityLocation);
        locationInputEl.value = "";
    }
    else {
        alert("Please enter a city name")
    }
    console.log(event);
};


userFormEl.addEventListener("submit", formSubmitHandler);
locationBtnEl.addEventListener("click", formSubmitHandler);