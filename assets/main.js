const APIkey = '9a617f7d2d387bdd3bceb07261c40664'
const searchBtn = document.querySelector('#searchBtn');
const currentTemp = document.querySelector(".current");
const highTemp = document.querySelector(".high");
const lowTemp = document.querySelector(".low");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const uvIndex = document.querySelector(".uvIndex");
const weather = document.querySelector(".cityWeather");
const windspeed = document.querySelector(".windspeed");
let cityName = document.querySelector('#searchTerm');
let uvCardColor = document.querySelector(".uvCard");
let lon;
let lat;

localStorage.setItem("searchHistory", cityName.value);

function renderWeather() {
let info = cityName.value;

const apiByCity = `https://api.openweathermap.org/data/2.5/weather?q=${info}&appid=${APIkey}&units=imperial`

fetch (apiByCity)
.then(results => {
  return results.json();
})
.then(results => {
  lat = results.coord.lat;
  lon = results.coord.lon;

  displayWeather(results);

  findUv(lat, lon);

  findForecast(lat, lon);
})
};

var displayWeather = function(data) {
  console.log(data);

  currentTemp.textContent = Math.floor(data.main.temp) + " °F";
  highTemp.textContent = Math.floor(data.main.temp_max) + " °F";
  lowTemp.textContent = Math.floor(data.main.temp_min) + " °F";
  humidity.textContent = Math.floor(data.main.humidity);
  city.textContent = data.name;
  weather.textContent = data.weather[0].description;
  windspeed.textContent = Math.floor(data.wind.speed) + " MPH";
};

var findUv = function(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}&units=imperial`) 
    .then(results => {
      return results.json();
    })  
    .then(results => {
      console.log(results);

      uvIndex.textContent = results.value;
      
      if(results.value > 10) {
        uvCardColor.setAttribute('class', 'bg-danger')
      } else if(results.value > 5) {
        uvCardColor.setAttribute('class', 'bg-warning')
      } else if(results.value <= 5) {
        uvCardColor.setAttribute('class', 'bg-success')
      }
    })
};

var findForecast = function(lat, lon) {
  fetch(`http://api.openweathermap.org/data/2.5/onecall?appid=${APIkey}&exclude=hourly,minutely,alert&lat=${lat}&lon=${lon}&units=imperial`)
  .then(results => {
    return results.json()
  })
  .then(results => {
    console.log(results);

    let mondayTemp = document.querySelector('.mondayTemp');
    let mondayHumidity = document.querySelector('.mondayHumidity');
    mondayTemp.textContent = Math.floor(results.daily[1].temp.day) + " °F";
    mondayHumidity.textContent = "Humidity: " + (results.daily[1].humidity);

    let tuesdayTemp = document.querySelector('.tuesdayTemp');
    let tuesdayHumidity = document.querySelector('.tuesdayHumidity');
    tuesdayTemp.textContent = Math.floor(results.daily[2].temp.day) + " °F";
    tuesdayHumidity.textContent = "Humidity: " + (results.daily[2].humidity);

    let wednesdayTemp = document.querySelector('.wednesdayTemp');
    let wednesdayHumidity = document.querySelector('.wednesdayHumidity');
    wednesdayTemp.textContent = Math.floor(results.daily[3].temp.day) + " °F";
    wednesdayHumidity.textContent = "Humidity: " + (results.daily[3].humidity);

    let thursdayTemp = document.querySelector('.thursdayTemp');
    let thursdayHumidity = document.querySelector('.thursdayHumidity');
    thursdayTemp.textContent = Math.floor(results.daily[4].temp.day) + " °F";
    thursdayHumidity.textContent = "Humidity: " + (results.daily[4].humidity);

    let fridayTemp = document.querySelector('.fridayTemp');
    let fridayHumidity = document.querySelector('.fridayHumidity');
    fridayTemp.textContent = Math.floor(results.daily[5].temp.day) + " °F";
    fridayHumidity.textContent = "Humidity: " + (results.daily[5].humidity);
    })
};

searchBtn.addEventListener('click', renderWeather);  

//https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alert&appid=${APIkey}

