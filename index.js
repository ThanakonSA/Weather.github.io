const apiKey = '9bbbd14d97f2095956530386dd878dfc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityCoordinates = {
    "Loei": { lat: 17.42203706894463, lon: 101.61578662630184 },
    "Nong Khai": { lat: 17.778691915270628, lon: 102.74203940765959 },
    "Tokyo": { lat: 35.6762, lon: 139.6503 },
    "Khon Kaen": { lat: 15.976886807214663, lon: 102.62881177670099 },
    "Udon Thani": { lat: 17.419650697887384, lon: 103.01733510849658 }
};

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('กรุณาเลือกเมือง');
        return;
    }

    const { lat, lon } = cityCoordinates[city];
    
    try {
        
        const weatherResponse = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        
        if (weatherData.cod !== 200) {
            document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${weatherData.message}`;
            return;
        }

        const { main, wind } = weatherData;
        document.getElementById('weather-info').innerHTML = `
            <h2>สภาพอากาศใน ${city}</h2>
            <p>อุณหภูมิ: ${main.temp} °C</p>
            <p>ความชื้น: ${main.humidity} %</p>
            <p>ความเร็วลม: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${error.message}`;
    }
}