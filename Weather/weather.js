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

function lastThreeDaysForecast(forecastData){
        // 生成未来三天的天气预报
        const futureForecast = forecastData.slice(1, 4); // 取未来三天
        futureForecast.forEach((day, index) => {
            const container = foreContainer[index]; // 每个预报卡片的容器
            if (container) {
                const icon = document.createElement("img");
                icon.src = getWeatherIcon(day.dayweather, true); // 白天天气图标
                icon.className = "icon";

                const fweather = document.createElement("p");
                fweather.textContent = day.dayweather;

                const tempRange = document.createElement("p");
                tempRange.textContent = `${day.nighttemp}°C ~ ${day.daytemp}°C`;

                const week = document.createElement("p");
                week.textContent = getWeekText(parseInt(day.week));

                const daywind = document.createElement("p");
                daywind.textContent = day.daywind;

                const daypower = document.createElement("p");
                daypower.textContent = day.daypower;

                container.appendChild(icon);
                container.appendChild(fweather);
                container.appendChild(tempRange);
                container.appendChild(week);
                container.appendChild(daywind);
                container.appendChild(daypower);
            }
        });
}

function fourDaysForecast(forecastData){
    // 生成四天的天气预报
    const futureForecast = forecastData// 取未来三天
    futureForecast.forEach((forecast, index) => {
        const container = each-day[index]; // 每个预报卡片的容器
        if (container) {
            const week = document.createElement("p");
            week.textContent = getWeekText(parseInt(forecast.week));

            const day = document.createElement("div");

            const text = document.createElement("p");
            text.textContent = '日间';

            const icon = document.createElement("img");
            icon.src = getWeatherIcon(forecast.dayweather, true); // 白天天气图标
            icon.className = "icon";

            const fweather = document.createElement("p");
            fweather.textContent = forecast.dayweather;

            const tempRange = document.createElement("p");
            tempRange.textContent = `${forecast.nighttemp}°C`;


            const daywind = document.createElement("p");
            daywind.textContent = forecast.daywind;

            const daypower = document.createElement("p");
            daypower.textContent = forecast.daypower;

            day.appendChild(text);
            day.appendChild(icon);
            day.appendChild(fweather);
            day.appendChild(tempRange);
            day.appendChild(daywind);
            day.appendChild(daypower);
        }
    });
}

function insertWeather(data) {
    temperature.textContent = `${data.temperature}°C`;
    tempRange.textContent = `${data.nighttemp}°C ~ ${data.daytemp}°C`;
    weather.textContent = data.weather;
    city.textContent = data.city;
    province.textContent = data.province;
    week.textContent = data.week;
    winddir.textContent = data.winddirection;
    windpow.textContent = data.windpower;
    reporttime.textContent = data.reporttime;
}

//数据处理

//将forecast中的week处理成汉字
function getWeekText(week) {
    const weekDay = new Map([
        [1, '星期一'],
        [2, '星期二'],
        [3, '星期三'],
        [4, '星期四'],
        [5, '星期五'],
        [6, '星期六'],
        [7, '星期天']
    ]);
    return weekDay.get(week) || '未知';
}

//将forecast中的dayweather,nightweather匹配对应图标
function getWeatherIcon(weather, isDay) {
    const baseUrl = 'https://data-wyzmv.kinsta.page/icon/';
    let weatherType = '';

    // 根据天气描述确定天气类型
    if (weather.includes('雨')) {
        weatherType = 'rainy';
        // 雨天白天和晚上使用同一张图片
    } else if (weather.includes('雪')) {
        weatherType = 'snowy';
        // 雪天白天和晚上使用同一张图片
    } else if (weather.includes('晴')) {
        weatherType = 'sunny';
        // 晴天需要区分白天和晚上
        return `${baseUrl}${weatherType}${isDay ? '-day' : '-night'}.png`;
    } else if (weather.includes('云')) {
        weatherType = 'cloudy';
        return `${baseUrl}${weatherType}${isDay ? '-day' : '-night'}.png`;
        // 多云需要区分白天和晚上
    } else if (weather.includes('阴')) {
        weatherType = 'cloud';
        // 阴天白天和晚上使用同一张图片
    } else {
        weatherType = 'kawaii-ghost';
        // 默认情况使用同一张图片
    }

    return `${baseUrl}${weatherType}.png`;
}

// 获取天气相关主题
function getWeatherTheme(weather) {
    let weatherType = '';
    if (weather.includes('雪')) {
        weatherType = 'snowy';
    } else if (weather.includes('雨')) {
        weatherType = 'rainy';
    } else if (weather.includes('晴')) {
        weatherType = 'sunny';
    } else if (weather.includes('云')) {
        weatherType = 'cloudy';
    } else if (weather.includes('阴')) {
        weatherType = 'overcast';
    } else {
        weatherType = 'default';
    }
    return weatherType;
}

//切换主题
function changeTheme(theme) {
    const page1 = document.getElementsByClassName('page1');
    page1.classList.add(`page1-${theme}`);
    const page2 = document.getElementsByClassName('page2');
    page2.classList.add(`page2-${theme}`);
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
            nighttemp: todayForecast.nighttemp, // 夜间温度
            week: getWeekText(parseInt(todayForecast.week))
        };
        insertWeather(mergedData);

        //切换主题
        const theme = getWeatherTheme(liveData.weather);
        changeTheme(theme);



        //加载中
        setTimeout(() => document.querySelector('.loading').style.display = 'none', 2000);

    })

    .catch(error => {
        console.error('错误详情:', error.message);
        alert('获取天气数据失败，请检查 API key 或网络连接');
    });

