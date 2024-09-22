const apikey = "a4aa2f4258bb96824520758068f52bc7";

const weatherDataEle = document.querySelector(".weather-data")

const cityNameEle = document.querySelector("#city-name")

const formEle = document.querySelector("form")

const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit",(e)=>{
    // console.log(cityNameEle.value);
e.preventDefault()
    const cityValue = cityNameEle.value

    getWeatherData(cityValue)
    
})

async function getWeatherData(cityValue){
    try {
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
    if(!response.ok){
        throw new Error("Network response is not ok!!")
    }
    const data = await response.json();
    // console.log(data);
    const temperature = Math.floor(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    const details = [
        `Feels Like:${Math.floor(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed}m/s`,

    ]

    weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`

    weatherDataEle.querySelector(".desc").textContent = `${description}`

    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

    weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
        return `<div>${detail}</div>`
    }).join("")
    

    } catch (error) {
        weatherDataEle.querySelector(".temp").innerHTML = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred..!"
        
    }
 
}