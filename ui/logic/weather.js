const lat = 49.926502
const lon = 8.406923
const timezone = 'Europe/Berlin'
const StundenWetterVorhersage = 3

const dateCast = 'date-cast'
const iconCast = 'icon-cast'

const daily = 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,temperature_2m_max,temperature_2m_min'
const hourly = 'weather_code,temperature_2m,is_day'
const current = 'temperature_2m,relative_humidity_2m,weather_code,is_day,'

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${daily}&hourly=${hourly}&current=${current}&timezone=${timezone}&forecast_days=3`

export function getWeatherData(baseURL) {
     fetch(url)
     .then(res => res.json())
     .then(data => {
          const {temperature_2m: tempAktuell,relative_humidity_2m,weather_code: iconAktuell,is_day} = data.current
          const {precipitation_probability_max, temperature_2m_min, temperature_2m_max} = data.daily
          const {time: timeHourString,weather_code: iconHour,temperature_2m: tempHour, is_day: dayHour} = data.hourly
          const weatherIcon = getIconForWeather(iconAktuell)

          const now = new Date();
          now.setMinutes(0,0,0);

          const futureWeather = timeHourString.map((t, i) => ({
               date: new Date(t),
               is_day: dayHour[i],
               temp: tempHour[i],
               icons: getIconForWeather(iconHour[i])
          })).filter(entry => entry.date > now);

          document.getElementById("tempAktuell").textContent = `${tempAktuell.toFixed(1)}°C`
          document.getElementById("tempIcon").src = `${baseURL}/assets/icons/${is_day ? weatherIcon.icons.day : weatherIcon.icons.night}` 

          document.getElementById("regenwahrscheinlichkeit").textContent = `${precipitation_probability_max[0].toFixed(0)}%`
          document.getElementById("luftfeuchtigkeit").textContent = `${relative_humidity_2m.toFixed(0)}%`

          document.getElementById("tempMin").textContent = `${temperature_2m_min[0].toFixed(1)}°C`
          document.getElementById("tempMax").textContent = `${temperature_2m_max[0].toFixed(1)}°C`

          for (let i = 0; i < 4; i++) {
               let time = futureWeather[i*StundenWetterVorhersage].date.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit"
               });

               document.getElementById(`${dateCast}${i+1}`).textContent = time

               let icon = futureWeather[i*StundenWetterVorhersage].is_day ? futureWeather[i*StundenWetterVorhersage].icons.icons.day : futureWeather[i*StundenWetterVorhersage].icons.icons.night

               document.getElementById(`${iconCast}${i+1}`).src = `${baseURL}/assets/icons/${icon}`
          }

     })
}

export function getIconForWeather(code) {
return weather_codes[code] || 'wi_not-available'; // fallback
}

const weather_codes = {
     0: {
          name: "Clear Sky",
          icons: {
               day: "clear.svg",
               night: "clear-night.svg"
          }
     },
     1: {
          name: "Mainly Clear",
          icons: {
               day: "clear.svg",
               night: "clear-night.svg"
          }
     },
     2: {
          name: "Partly Cloudy",
          icons: {
               day: "partly-cloudy.svg",
               night: "partly-cloudy-night.svg"
          }
     },
     3: {
          name: "Overcast",
          icons: {
               day: "overcast.svg",
               night: "overcast.svg"
          }
     },
     45: {
          name: "Fog",
          icons: {
               day: "fog.svg",
               night: "fog-night.svg"
          }
     },
     48: {
          name: "Rime Fog",
          icons: {
               day: "rime-fog.svg",
               night: "rime-fog.svg"
          }
     },
     51: {
          name: "Light Drizzle",
          icons: {
               day: "light-drizzle.svg",
               night: "light-drizzle.svg"
          }
     },
     53: {
          name: "Moderate Drizzle",
          icons: {
               day: "drizzle.svg",
               night: "drizzle.svg"
          }
     },
     55: {
          name: "Heavy Drizzle",
          icons: {
               day: "heavy-drizzle.svg",
               night: "heavy-drizzle.svg"
          }
     },
     56: {
          name: "Light Freezing Drizzle",
          icons: {
               day: "drizzle.svg",
               night: "drizzle.svg"
          }
     },
     57: {
          name: "Dense Freezing Drizzle",
          icons: {
               day: "heavy-drizzle.svg",
               night: "heavy-drizzle.svg"
          }
     },
     61: {
          name: "Slight Rain",
          icons: {
               day: "slight-rain.svg",
               night: "slight-rain-night.svg"
          }
     },
     63: {
          name: "Moderate Rain",
          icons: {
               day: "rain.svg",
               night: "rain.svg"
          }
     },
     65: {
          name: "Heavy Rain",
          icons: {
               day: "heavy-rain.svg",
               night: "heavy-rain.svg"
          }
     },
     66: {
          name: "Light Freezing Rain",
          icons: {
               day: "rain.svg",
               night: "rain.svg"
          }
     },
     67: {
          name: "Heavy Freezing Rain",
          icons: {
               day: "heavy-rain.svg",
               night: "heavy-rain.svg"
          }
     },
     71: {
          name: "Slight snowfall",
          icons: {
               day: "light-snow.svg",
               night: "light-snow-night.svg"
          }
     },
     73: {
          name: "Moderate snowfall",
          icons: {
               day: "snow.svg",
               night: "snow.svg"
          }
     },
     75: {
          name: "Heavy snowfall",
          icons: {
               day: "heavy-snow.svg",
               night: "heavy-snow.svg"
          }
     },
     77: {
          name: "Snow Grains",
          icons: {
               day: "snow-grains.svg",
               night: "snow-grains.svg"
          }
     },
     80: {
          name: "Slight Rain Showers",
          icons: {
               day: "slight-rain-showers.svg",
               night: "slight-rain-showers-night.svg"
          }
     },
     81: {
          name: "Moderate Rain Showers",
          icons: {
               day: "rain-showers.svg",
               night: "rain-showers.svg"
          }
     },
     82: {
          name: "Violent Rain Showers",
          icons: {
               day: "heavy-rain-showers.svg",
               night: "heavy-rain-showers.svg"
          }
     },
     85: {
          name: "Light Snow Showers",
          icons: {
               day: "light-snow-showers.svg",
               night: "light-snow-showers.svg"
          }
     },
     86: {
          name: "Heavy Snow Showers",
          icons: {
               day: "heavy-snow-showers.svg",
               night: "heavy-snow-showers.svg"
          }
     },
     95: {
          name: "Thunderstorm",
          icons: {
               day: "thunderstorm.svg",
               night: "thunderstorm.svg"
          }
     },
     96: {
          name: "Slight Hailstorm",
          icons: {
               day: "hail.svg",
               night: "hail.svg"
          }
     },
     99: {
          name: "Heavy Hailstorm",
          icons: {
               day: "heavy-hail.svg",
               night: "heavy-hail.svg"
          }
     }
};