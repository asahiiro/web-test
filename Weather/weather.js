const apiKey = '2f7c1f0473c07d78c0f430480094e126';



//DOM
const temperature = document.getElementById('temperature'); 
const tempRange = document.getElementById('tempRange');
const weather = document.getElementById('weather');
const location = document.getElementById('location');
const city = document.getElementById('city');
const province = document.getElementById('province');
const week = document.getElementById('week');
const wind = document.getElementById('wind');
const winddir = document.getElementById('winddir');
const windpow = document.getElementById('windpow');
const reporttime = document.getElementById('reporttime');


function getAdcode() {
    return fetch(`https://restapi.amap.com/v3/ip?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "1"){
            return data.adcode;
        } else {
            throw new Error("获取adcode失败");
        }
    });
}


function getLiveWeather(adcode) {
    return fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKey}&extensions=base`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "1") {
            return data.forecasts[0].casts;
        } else {
            throw new Error("获取天气数据失败");
        }
    });
}


function getForecastWeather(adcode) {
    return fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKey}&extensions=all`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "1") {
            return data.forecasts[0].casts;
        } else {
            throw new Error("获取天气数据失败");
        }
    });
}

function insertWeather(data){
    temperature.textContent = data.temperature +'°C' ;
    tempRange.textContent = data.nighttemp + '°C / ' + data.daytemp + '°C'  ;
    weather.textContent = data.weather ;
    location.textContent = data.location ;
    city.textContent = data.city ;
    province.textContent = data.province ;
    week.textContent = data.week ;
    wind.textContent = data.wind ;
    winddir.textContent = data.winddir ;
    windpow.textContent = data.windpow ;
    reporttime.textContent = data.reporttime ;
}

getAdcode()
.then(adcode => {
    getLiveWeather(adcode);
})
.then(weatherData => renderWeather(weatherData))
.catch(error => {
  console.error(error);
  alert('获取天气数据失败，请检查 API key 或网络连接');
});

