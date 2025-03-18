//key
// const apiKey = '2f7c1f0473c07d78c0f430480094e126';

//DOM
const temperature = document.getElementById('temperature'); 
const tempRange = document.getElementById('tempRange');
const weather = document.getElementById('weather');
const city = document.getElementById('city');
const province = document.getElementById('province');
const week = document.getElementById('week');
const winddir = document.getElementById('winddir');
const windpow = document.getElementById('windpow');
const reporttime = document.getElementById('reporttime');
const foreContainer = document.getElementsByClassName('forecast-container'); 

//天气相关
function getAdcode() {
    return fetch(`https://restapi.amap.com/v3/ip?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === '1'){
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
        if (data.status === '1') {
            return data.lives[0];
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
    temperature.textContent = `${data.temperature}°C` ;
    tempRange.textContent =  `${data.nighttemp}°C ~ ${data.daytemp}°C` ;
    weather.textContent = data.weather ;
    city.textContent = data.city ;
    province.textContent = data.province ;
    week.textContent = data.week ;
    winddir.textContent = data.winddirection ;
    windpow.textContent = data.windpower ;
    reporttime.textContent = data.reporttime ;
}

getAdcode()
  .then(adcode => {
    return Promise.all([getLiveWeather(adcode), getForecastWeather(adcode)]);
  })
  .then(([liveData, forecastData]) => {
    const todayForecast = forecastData[0];
    const mergedData = {
      ...liveData,           // 实况天气的所有字段
      daytemp: todayForecast.daytemp,   // 白天温度
      nighttemp: todayForecast.nighttemp // 夜间温度
    };
    insertWeather(mergedData);
  })
  .catch(error => {
    console.error('错误详情:', error.message);
    alert('获取天气数据失败，请检查 API key 或网络连接');
  });

//循环生成
for(let i = 0 ; i < 3 ; i++){
    let icon = document.createElement("img");
    icon.classname = "icon";
    let fweather = document. createElement("p");
    fweather.textContent = '这里填天气';
}

//加载中
setTimeout(() =>     document.querySelector('.loading').style.display = 'none',2000);

