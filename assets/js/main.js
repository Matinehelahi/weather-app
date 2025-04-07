const cityInput = document.querySelector('.city__input');//نام شهر
const searchBtn = document.querySelector('.search__btn');//دکمه جستجو

const notFoundSection = document.querySelector('.not-found');//بخش زمانی که شهری پیدا نشود
const searchCtiySection = document.querySelector('.search-city');//بخش جستجوی شهر
const weatherInfoSection = document.querySelector('.wether__info');//وضعیت آب و هوا بخش نمایش اطلاعات

const countryTxt = document.querySelector('.country__txt');//کشور
const tempTxt = document.querySelector('.temp-txt');//دما
const windValueTxt = document.querySelector('.wind-value-txt');//سرعت باد
const humidityValueTxt = document.querySelector('.humidity-value-txt');//رطوبت
const weatherSummeryIg = document.querySelector('.weather__summery-img');// وضعیت آب و هوا تصویر
const currentDateTxt = document.querySelector('.current__date-txt');//تاریخ
const conditionTxt = document.querySelector('.condition__txt');//وضعیت آب و هوا

const forecastItemsContainer = document.querySelector('.forecast-item-container');//المان نمایش پیش‌بینی وضعیت آب و هوا


const apikey = '7843e467f3e199e4211f91e8222591eb'; // کلید API برای دسترسی به اطلاعات از OpenWeatherMap


searchBtn.addEventListener('click', () => { // افزودن رویداد برای دکمه جستجو
    if (cityInput.value.trim() != '') {//اگر ورودی خالی نباشه
        updateWetherInfo(cityInput.value);//بروزرسانی اطلاعات آب و هوا
        cityInput.value = '';// پاک کردن ورودی بعد از جستجو
        cityInput.blur();// از حالت فوکوس خارج کردن ورودی
    }

});

cityInput.addEventListener('keydown', (event) => {// افزودن رویداد برای کلید Enter در ورودی

    if (event.key == 'Enter' && cityInput.value.trim() != '' // وقتی Enter زده شود و ورودی خالی نباشد
    ) {
        updateWetherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) { // تابع برای دریافت داده‌های API از 

    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`
    const response = await fetch(apiUrl);// ارسال درخواست  

    return response.json() // تبدیل پاسخ به فرمت JSON
}

function getWeatherIcon(id) { // تابع برای تعیین نماد وضعیت آب و هوا
    if (id <= 232) return 'thunderstrom.svg'
    if (id <= 321) return 'drizzle.jpg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atomospher.svg'
    if (id <= 800) return 'clear.png'
    else return 'cloud.svg'


}
// تابع برای گرفتن تاریخ الانه
function getCurrentDate() {
    const currentDate = new Date() //گرفتن تاریخ و زمان
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-US', options) //برگرداندن تاریخ
}
//بروزرسانی اطلاعات آب و هوا
async function updateWetherInfo(city) {
    const weatherData = await getFetchData('weather', city) //دریافت وضعیت آب و هوا
    if (weatherData.cod != 200) { // (اگر پاسخ متفاوت از 200 بود (خطا
        showDisplaySection(notFoundSection) //نمایش بخش خطا
        return
    }

    const {     // استخراج از پاسخ API

        name: country, //کشور
        main: { temp, humidity },//دما و رطوبت
        weather: [{ id, main }],// وضعیت کلی آب و هوا
        wind: { speed }  // سرعت باد
    } = weatherData
    //نمایش داده‌ها در صفحه
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '℃';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'M/s';

    currentDateTxt.textContent = getCurrentDate()
    weatherSummeryIg.src = `assets/weather/${getWeatherIcon(id)}`
    //نمایش تصویر
    await updateForecastInfo(city)
    showDisplaySection(weatherInfoSection);
}

//بروزرسانی پیش‌بینی وضعیت آب و هوا روز های آینده
async function updateForecastInfo(city) {
    const forecastsData = await getFetchData('forecast', city)
//دریافت پیش‌بینی وضعیت آب و هوا برای چند روز پیش فرض
    const timeTaken = '12:00:00' //زمان مورد نظر برای پیش‌بینی‌ها
    const todayDate = new Date().toISOString().split('T')[0] // تاریخ امروز

    forecastItemsContainer.innerHTML = '' //پاک کردن پیش‌بینی‌های قبلی
    forecastsData.list.forEach(forecastWeather => {  // نمایش پیش‌بینی‌ها برای زمان مشخص (12:00) و برای روزهای بعد از امروز
        if (forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }
    })

}

function updateForecastItems(weatherData) {
    console.log(weatherData)
    const {
        dt_txt: date, //تاریخ و زمان پیش‌بینی
        weather: [{ id }], // وضعیت آب و هوا
        main: { temp } //دمای پیش‌بینی شده

    } = weatherData

    const dateTaken = new Date(date) // تبدیل تاریخ به فرمت
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption) // نمایش تاریخ   
    const forecastItem = `
    <div class="forcast-item">
        <h5 class="forcast-item-date regular-txt">${dateResult}</h5>
        <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
        <h5 class="forcast-item-temp">${Math.round(temp)} &#8451;</h5>
    </div> 
    `
    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
}
function showDisplaySection(section) { // تابع برای نمایش بخش‌های مختلف صفحه
    // مخفی کردن همه بخش‌ها و سپس نمایش بخش  
    [weatherInfoSection, searchCtiySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display = 'flex';
}
