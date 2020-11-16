// form variables
let userFormEl = document.querySelector("#user-form");
let locationInputEl = document.querySelector("#location");
let locationBtnEl = document.querySelector("#button-addon2");

// location list variables
let locationResultsEl = document.querySelector(".list-group");

// Main weather content variables
let locationWeatherEl = document.querySelector(".main-weather");


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
            displayCityLocation(data);
            displayCityWeather(data);
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
    
};

// display the city buttons on left container
let displayCityLocation = function(city) {
    let cityBtn = document.createElement("button");
    cityBtn.setAttribute("id", city.name);
    cityBtn.setAttribute("class", "list-group-item");
    cityBtn.setAttribute("onclick", `getCityLocation("${city.name}")`);
    let cityNameBtn = document.querySelector(".list-group");
    cityNameBtn.appendChild(cityBtn);
    cityBtn.textContent = city.name;
};

// display city's weather
let displayCityWeather = function(city) {
    document.getElementById("city-name").textContent = city.name;
    document.getElementById("city-temp").textContent = "Temperature: " + city.main.temp + "°F";
    document.getElementById("city-humid").textContent = "Humidity: " + city.main.humidity + "%";
    document.getElementById("city-wind").textContent = "Wind Speed: " + city.wind.speed + "MPH";
    document.getElementById("city-uv").textContent = "UV Index: " + city.coord + "%";
    let weatherIcon = city.weather[0].icon;
    let iconurl =  "http://openweathermap.org/img/w/" + weatherIcon + ".png";
    document.getElementById("icon").setAttribute("src", iconurl);
}

// get UV index

// form event listeners
userFormEl.addEventListener("submit", formSubmitHandler);
locationBtnEl.addEventListener("click", formSubmitHandler);