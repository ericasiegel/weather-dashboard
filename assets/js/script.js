// form variables
let userFormEl = document.querySelector("#user-form");
let locationInputEl = document.querySelector("#location");
let locationBtnEl = document.querySelector("#button-addon2");

// location list variables
let locationResultsEl = document.querySelector(".list-group");

// Main weather content variables
let locationWeatherEl = document.querySelector(".main-weather");
let uvIndex = document.querySelector("#city-uv");
let dateEl = document.querySelector("#city-date");


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

            // display the City Names in the left column
            displayCityLocation(data);

        // main city weather
            // City Name, temperature, humidity, wind speed
            document.getElementById("city-name").textContent = data.name;
            document.getElementById("city-temp").textContent = "Temperature: " + data.main.temp + "°F";
            document.getElementById("city-humid").textContent = "Humidity: " + data.main.humidity + "%";
            document.getElementById("city-wind").textContent = "Wind Speed: " + data.wind.speed + "MPH";
            
            // city weather icon
            let weatherIcon = data.weather[0].icon;
            let iconurl =  "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            document.getElementById("icon").setAttribute("src", iconurl);

            // city UV index
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&daily&exclude=hourly,minutely" + apiKey)
            .then(function(response){
                response.json().then(function(data){
                    let uvEl = document.createElement("p");
                        uvEl.textContent ="UV Index: " + data.current.uvi;
                        if(data.current.uvi > 5){
                            uvEl.setAttribute('class', 'bg-danger');
                            }
                            else if (data.current.uvi>=3){
                            uvEl.setAttribute('class', 'bg-warning');
                            } else{
                            uvEl.setAttribute('class', 'bg-success');
                            }
                        uvIndex.innerHTML = "";
                        uvIndex.appendChild(uvEl);

                    // current city date
                    let cityDate = data.current.dt;
                    let date = new Date(cityDate * 1000)
                    console.log(date);
                    let day = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    dateEl.textContent = month + " / " + day + " / " + year;
                    
                    // 5 day forecast call
                    for (let i = 0; i < response.length; i++) {

                        // daily weather container
                        let dailyEl = document.createElement("div");
                        dailyEl.classList = "card text-white bg-primary mb-3";

                        // daily date
                        let dDate = response[i].daily[i].dt;
                        let fDate = new Date(dDate * 1000)
                        let day = fDate.getDate();
                        let month = fDate.getMonth();
                        let year = fDate.getFullYear();
                        let dailyDate = document.createElement("p");
                        dailyDate.textContent = month + " / " + day + " / " + year;

                        //create span to hold data
                        let dailyData = document.createElement("span");
                        dailyData.textContent = dailyDate;

                        // append to container
                        dailyEl.appendChild(dailyData);

                        // append to page
                        fiveDayForecastEl.appendChild(dailyEl);
                        
                    }
                    
                })
                
            })
        });
       
    })

}
    


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

// let forecast = function() {
//     for (let i = 0; i< forecast.length; i+8) {
//     //   forecast[i].innerHTML = "";

        // daily date
        // let dDate = forecast[i].daily[0].dt;
        // let fDate = new Date(dDate * 1000)
        // let day = fDate.getDate();
        // let month = fDate.getMonth();
        // let year = fDate.getFullYear();
        // let dailyDate = document.createElement("p");
        // dailyDate.textContent = month + " / " + day + " / " + year;

//         // daily icon
//         let dIcon = forecast[i].daily[0].weather[0].icon;
//             let diconurl =  "http://openweathermap.org/img/w/" + dIcon + ".png";
//             let dailyIcon = document.createElement("img");
//             dailyIcon.setAttribute("src", diconurl);

//         // daily temperature
//         let dTemp = forecast[i].daily[0].temp.day;
//         let dailyTemp = document.createElement("p");
//         dailyTemp.textContent = dTemp + "°F";

//         // daily humidity
//         let dhumid = forecast[i].daily[0].humidity;
//         let dailyHumid = document.createElement("p");
//         dailyHumid.textContent = dhumid + "%";

//         let dailycard = document.createElement("div");
//         dailycard.setAttribute("class", "card text-white bg-primary mb-3");
//         dailycard.setAttribute("style", "max=width: 18rem;");

//         fiveDayForecastEl.appendChild(dailycard);
//         dailycard.appendChild(dailyDate);
//         dailycard.appendChild(dailyIcon);
//         dailycard.appendChild(dailyTemp);
//         dailycard.appendChild(dailyHumid);
       
//     }
// }
// console.log(forecast);

// form event listeners
userFormEl.addEventListener("submit", formSubmitHandler);
locationBtnEl.addEventListener("click", formSubmitHandler);