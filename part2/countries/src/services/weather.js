import axios from 'axios'
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall"
const weatherKey = import.meta.env.VITE_OPENWEATHERMAP_KEY

const getWeather = (lat, lng) => {
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&appid=${weatherKey}&units=metric`)
  return request.then(response => response.data)
}

export default {
  getWeather
}