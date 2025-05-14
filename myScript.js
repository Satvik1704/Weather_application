document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "399760ad9a634d6f488f0dde6c7e7955";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      showError("Please enter a valid city name");
      return;
    };

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

const weatherCache ={};


  async function fetchWeatherData(city) {
if(weatherCache[city]){
  return weatherCache[city];
}

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    
    try {
      const response = await fetch(url);



    if (!response.ok) {
      throw new Error("HTTP error! Something went wrong");
    }
  
    const data = await response.json();
    return data;
  }catch(error){
    console.log("Error in fetching data:", error);
    throw error;
    
  }
}

  function displayWeatherData(data) {
   try{ 
    const { name, main, weather} = data;
  
  if(!name || !main || !weather){
    throw new error("Invalid weather data structure");
  }

  const tempCelsius = (main.temp-273.15).toFixed(1);
  
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent =`Temperature: ${tempCelsius}°C`;
  descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add("hidden")
}catch(error){
  console.log("Error in displaying weather");
  
}
  
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }

});
