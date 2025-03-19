// API Key（请确保是有效的）
const apiKey = '2f7c1f0473c07d78c0f430480094e126';

// DOM 元素获取
const temperature = document.getElementById('temperature');
const tempRange = document.getElementById('tempRange');
const weather = document.getElementById('weather');
const city = document.getElementById('city');
const week = document.getElementById('week');
const winddir = document.getElementById('winddir');
const windpow = document.getElementById('windpow');
const reporttime = document.getElementById('reporttime');
const icon1 = document.getElementById('icon1');

// 天气相关函数
function getAdcode() {
    return fetch(`https://restapi.amap.com/v3/ip?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1') {
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

function lastThreeDaysForecast(forecastData) {
    const futureForecast = forecastData.slice(1, 4); // 取未来三天
    const containers = document.querySelectorAll('.forecast'); // 获取所有预报容器
    futureForecast.forEach((day, index) => {
        const container = containers[index]; // 选择对应的容器
        if (container) {
            const icon = document.createElement("img");
            icon.src = getWeatherIcon(day.dayweather, true);
            icon.className = "icon2";

            const fweather = document.createElement("p");
            fweather.textContent = day.dayweather;

            const tempRange = document.createElement("p");
            tempRange.textContent = `${day.nighttemp}°C ~ ${day.daytemp}°C`;

            const week = document.createElement("p");
            week.textContent = getWeekText(parseInt(day.week));

            const daywind = document.createElement("p");
            daywind.textContent = `${day.daywind}风 ${day.daypower}级`;

            container.appendChild(icon);
            container.appendChild(fweather);
            container.appendChild(tempRange);
            container.appendChild(daywind);
            container.appendChild(week);
        }
    });
}

function fourDaysForecast(forecastData) {
    const containers = document.querySelectorAll('.each-day');
    forecastData.slice(0, containers.length).forEach((forecast, index) => { // 防止超出容器数量
        const container = containers[index];
        if (container) {
            container.innerHTML = ''; // 清空容器内容

            const week = document.createElement("p");
            week.textContent = getWeekText(parseInt(forecast.week));
            container.appendChild(week);

            const day = document.createElement("div");
            day.className = 'day';
            day.innerHTML = `<p>日间</p>
            <img src="${getWeatherIcon(forecast.dayweather, true)}" class="icon3">
            <p>${forecast.dayweather}</p>
            <p>${forecast.daytemp}°C</p>
            <p>${forecast.daywind}风 ${forecast.daypower}级</p>`;
            container.appendChild(day);

            const night = document.createElement("div");
            night.className = 'night';
            night.innerHTML = `<p>夜间</p>
            <img src="${getWeatherIcon(forecast.nightweather, false)}" class="icon3">
            <p>${forecast.nightweather}</p>
            <p>${forecast.nighttemp}°C</p>
            <p>${forecast.nightwind}风 ${forecast.nightpower}级</p>`;
            container.appendChild(night);
        }
    });
}

function insertWeather(data) {
    if (temperature) temperature.textContent = `${data.temperature}°C`;
    if (tempRange) tempRange.textContent = `${data.nighttemp}°C ~ ${data.daytemp}°C`;
    if (icon1) icon1.src = getWeatherIcon(data.weather, true);
    if (weather) weather.textContent = data.weather;
    if (city) city.textContent = `${data.city} ${data.province}`;
    if (week) week.textContent = data.week;
    if (winddir) winddir.textContent = data.winddirection;
    if (windpow) windpow.textContent = data.windpower;
    if (reporttime) reporttime.textContent = data.reporttime;
}

// 数据处理函数
function getWeekText(week) {
    const weekDay = new Map([
        [1, '星期一'], [2, '星期二'], [3, '星期三'], [4, '星期四'], [5, '星期五'], [6, '星期六'], [7, '星期天']
    ]);
    return weekDay.get(week) || '未知';
}

function getWeatherIcon(weather, isDay) {
    const baseUrl = 'https://data-wyzmv.kinsta.page/icon/';
    let weatherType = '';
    if (weather.includes('雨')) {
        weatherType = 'rainy';
    } else if (weather.includes('雪')) {
        weatherType = 'snowy';
    } else if (weather.includes('晴')) {
        weatherType = 'sunny';
        return `${baseUrl}${weatherType}${isDay ? '-day' : '-night'}.png`;
    } else if (weather.includes('云')) {
        weatherType = 'cloudy';
        return `${baseUrl}${weatherType}${isDay ? '-day' : '-night'}.png`;
    } else if (weather.includes('阴')) {
        weatherType = 'cloud';
    } else {
        weatherType = 'kawaii-ghost';
    }
    return `${baseUrl}${weatherType}.png`;
}

function getWeatherTheme(weather) {
    if (weather.includes('雪')) return 'snowy';
    if (weather.includes('雨')) return 'rainy';
    if (weather.includes('晴')) return 'sunny';
    if (weather.includes('云')) return 'cloudy';
    if (weather.includes('阴')) return 'overcast';
    return 'default';
}

function changeTheme(theme) {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    if (page1) page1.classList.add(`page1-${theme}`);
    if (page2) page2.classList.add(`page2-${theme}`);
}

// 主逻辑
getAdcode()
    .then(adcode => Promise.all([getLiveWeather(adcode), getForecastWeather(adcode)]))
    .then(([liveData, forecastData]) => {
        const todayForecast = forecastData[0];
        const mergedData = {
            ...liveData,
            daytemp: todayForecast.daytemp,
            nighttemp: todayForecast.nighttemp,
            week: getWeekText(parseInt(todayForecast.week))
        };
        insertWeather(mergedData);
        lastThreeDaysForecast(forecastData);
        fourDaysForecast(forecastData);
        const theme = getWeatherTheme(liveData.weather);
        changeTheme(theme);
        document.querySelector('.loading').style.display = 'none'; // 数据加载成功后隐藏加载提示
    })
    .catch(error => {
        console.error('错误详情:', error.message);
        alert('获取天气数据失败，请检查 API Key 或网络连接');
        document.querySelector('.loading').style.display = 'none'; // 数据加载失败后隐藏加载提示
    });