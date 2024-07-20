const apiKey = 'YOUR-API-KEY'; // OpenWeatherMap API key
const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const cityNameElement = document.getElementById('city-name');
const iconElement = document.getElementById('icon');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity-value');
const windSpeedElement = document.getElementById('wind-speed-value');

searchButton.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.weather) {
            updateWeatherInfo(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherInfo(data) {
    const weather = data.weather[0];
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    cityNameElement.textContent = data.name; // Şehir ismini ekleyin
    iconElement.innerHTML = `<i class="fa-solid fa-${getWeatherIcon(weather.icon)}"></i>`;
    tempElement.textContent = `${Math.round(temp)}°C`;
    descriptionElement.textContent = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
    humidityElement.textContent = `${humidity}%`;
    windSpeedElement.textContent = `${Math.round(windSpeed * 3.6)} km/h`; // Convert m/s to km/h
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud-meatball',
        '04n': 'cloud-meatball',
        '09d': 'cloud-showers-heavy',
        '09n': 'cloud-showers-heavy',
        '10d': 'cloud-showers-heavy',
        '10n': 'cloud-showers-heavy',
        '11d': 'bolt',
        '11n': 'bolt',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog'
    };
    return iconMap[iconCode] || 'cloud';
}
