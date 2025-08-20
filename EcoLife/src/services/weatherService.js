const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
