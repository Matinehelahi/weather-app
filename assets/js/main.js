const cityInput = document.querySelector('.city__input');
const searchBtn = document.querySelector('.search__btn');

const notFoundSection = document.querySelector('.not-found');
const searchCtiySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.wether__info');

const countryTxt = document.querySelector('.country__txt');
const tempTxt = document.querySelector('.temp-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const weatherSummeryIg = document.querySelector('.weather__summery-img');
const currentDateTxt = document.querySelector('.current__date-txt');
const conditionTxt = document.querySelector('.condition__txt');

const forecastItemsContainer = document.querySelector('.forecast-item-container')

const apikey = '7843e467f3e199e4211f91e8222591eb';

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWetherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }

});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != ''
    ) {
        updateWetherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`
    const response = await fetch(apiUrl);

    return response.json()
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstrom.svg'
    if (id <= 321) return 'drizzle.jpg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atomospher.svg'
    if (id <= 800) return 'clear.png'
    else return 'cloud.svg'


}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options)
}
async function updateWetherInfo(city) {
    const weatherData = await getFetchData('weather', city)
    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '℃';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'M/s';

    currentDateTxt.textContent = getCurrentDate()
    weatherSummeryIg.src = `assets/weather/${getWeatherIcon(id)}`

    await updateForecastInfo(city)
    showDisplaySection(weatherInfoSection);
}

async function updateForecastInfo(city) {
    const forecastsData = await getFetchData('forecast', city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastItemsContainer.innerHTML = ''
    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }
    })

}

function updateForecastItems(weatherData) {
    console.log(weatherData)
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }

    } = weatherData

    const dateTaken = new Date(date)
    const dateOption ={
        day:'2-digit',
        month:'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)
    const forecastItem = `
    <div class="forcast-item">
        <h5 class="forcast-item-date regular-txt">${dateResult}</h5>
        <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
        <h5 class="forcast-item-temp">${Math.round(temp)} &#8451;</h5>
    </div> 
    `
    forecastItemsContainer.insertAdjacentHTML('beforeend',forecastItem)
}
function showDisplaySection(section) {
    [weatherInfoSection, searchCtiySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display = 'flex';
}
