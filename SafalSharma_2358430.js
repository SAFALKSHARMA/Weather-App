let currCity = "Troy ";
let units = "metric";


let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');



document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    
    e.preventDefault();
    
    currCity = search.value;
    
    getWeather();

    search.value = ""
})



function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600;

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: "long",
        hour12: true,
    }
    return date.toLocaleString("en-US", options)  
}
 


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = '797737ffe7937e5a03dc0881afb13911'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather__humidity.innerHTML = `${data.main.humidity}%`
    weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    weather__pressure.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather())