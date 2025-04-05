const apiKey = "cfdc6d96d8f3b72051d2ca1835ebc2d8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error").style.display="block";     //check karega agr response status 404 hai mtlb invalid, so error msg ko none se block kardega(hidden to visible) & weather ko hide 
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();

        console.log(data); // inspect console me check karne ke lie ki data kis format me ara, & kya name hai wagera wagera 

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main != null) {// data ka 1st element weather ka bare me bata ra so [0], console se pata chala ki 1st kya ara 
            weatherIcon.src = "images/" + data.weather[0].main + ".png";
        }

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
    
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
