const cityInput = document.querySelector('.city__input');
const searchBtn = document.querySelector('.search__btn');
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
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}`
    const response = await fetch(apiUrl);

    return response.json()
}

async function updateWetherInfo(city) {
    const weatherData = await getFetchData('weather', city)
    console.log(weatherData)
}

