//Klucz API 
const apiKey = 'd281ac68c20913f7308036846c2dafc5'; 

//Obsługa kliknięcia przycisku
document.getElementById('weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();

    if (city) {
        getCurrentWeather(city);
        getWeatherForecast(city);
    } else {
        alert('Wprowadź nazwę miasta!');
    }
});

//Pobranie bieżącej pogody (XMLHttpRequest)
function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apiKey}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log('Aktualna pogoda:', data); 
            displayCurrentWeather(data);
        } else {
            console.error('Błąd pobierania danych:', xhr.statusText);
            alert('Nie udało się pobrać danych o aktualnej pogodzie.');
        }
    };
    xhr.onerror = () => {
        console.error('Błąd połączenia z serwerem.');
        alert('Nie udało się nawiązać połączenia z API.');
    };
    xhr.send();
}

//Pobranie prognozy pogody (Fetch API)
function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać danych o prognozie pogody.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Prognoza pogody:', data); 
            displayWeatherForecast(data); 
        })
        .catch(error => {
            console.error('Błąd pobierania danych prognozy:', error.message);
            alert('Nie udało się pobrać prognozy pogody.');
        });
}

//Wyświetlenie bieżącej pogody
function displayCurrentWeather(data) {
    const weatherDiv = document.getElementById('current-weather');

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pl-PL'); 
    const formattedTime = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); 

    weatherDiv.innerHTML = `
        <h2>Aktualna pogoda</h2>
        <div class="location-info">
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p class="date-time">${formattedDate} ${formattedTime}</p>
        </div>
        <p class="temperature"> ${data.main.temp} °C</p> <p>(odczuwalna: ${data.main.feels_like} °C)</p>
        <p>Opis: ${data.weather[0].description}</p>
        <p>Wilgotność: ${data.main.humidity}%</p>
        <p>Wiatr: ${data.wind.speed} m/s</p>
    `;
}

//Wyświetlenie prognozy pogody
function displayWeatherForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>Prognoza pogody</h2>';
    data.list.forEach((item, index) => {
        if (index % 6 === 0) { 
            const date = new Date(item.dt * 1000);
            forecastDiv.innerHTML += `
                <p><strong>${date.toLocaleString()}</strong></p>
                <p class="temperature"> ${item.main.temp} °C</p>
                <p>Opis: ${item.weather[0].description}</p>
                <hr>
            `;
        }
    });
}
