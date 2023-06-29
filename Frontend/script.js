const key='65c244c40e022e15c618220a60743dce';        //my api key
const callButton = document.getElementById('locationinput');
//console.log(callButton);
const weatherMap = new Map();

weatherMap.set("Thunderstorm",'./images/thunderstorm.jpg');
weatherMap.set("Drizzle", './images/drizzle.jpg');
weatherMap.set("Rain", './images/rain.jpg');
weatherMap.set("Snow", './images/snow.jpg');
weatherMap.set("Mist", './images/mist.jpg');
weatherMap.set("Smoke", './images/smoke.jpg');
weatherMap.set("Haze", './images/haze.jpg');
weatherMap.set("Dust", './images/dust.jpg');
weatherMap.set("Fog", './images/fog.jpg');
weatherMap.set("Sand", './images/sand.jpg');
weatherMap.set("Ash", './images/ash.jpg');
weatherMap.set("Squall", './images/squall.jpg');
weatherMap.set("Tornado", './images/tornado.jpg');
weatherMap.set("Clear", './images/clear.jpg');
weatherMap.set("Cloudy", './images/cloudy.jpg');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
      fetchData(url);
      },
      function(error) {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  
if(callButton){
    callButton.addEventListener('submit',(event)=>{
        event.preventDefault();
        const cityName = document.getElementById('city').value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
        alert(`Searcing for city ${cityName}`);
        fetchData(url);
    });
}

function scrapData(response){
    return new Promise((resolve,reject)=>{
        if(!response.ok){
            reject(new Error("404 Bad request"));
        }else{
            response.json().then(data=>{
                resolve(scrapJson(data));
            }).catch(error=>{
                reject(new Error("Invalid JSON format"));
            });
        }
    });
}

function scrapJson(data){
    const weather=data.weather;
    const obj={
        'description':weather[0].main,
        'temperature':data.main.temp,
        'humidity':data.main.humidity,
        'wind':data.wind.speed,
        'icon':data.weather[0].icon
   };
    
    return obj;
}
function showData(data){
    
    const description=data.description;
    const temperature=data.temperature;
    const humidity=data.humidity;
    const wind=data.wind;
    const icon=data.icon;

    const temperatureInCelsius =parseInt (parseFloat(temperature) - 273.15)+'°'+'C';
    
    if (weatherMap.has(weatherDescription)) {
        document.body.style.backgroundImage=`url($weatherMap.get(${description})`;
      }
    

    document.getElementById('temp').textContent=temperatureInCelsius;
    document.getElementById('wind').textContent=wind+" km/h";
    document.getElementById('humidity').textContent=humidity+"%";
    document.getElementById('description').textContent=description;
    document.getElementById('icon').src=`https://openweathermap.org/img/w/${icon}.png`;
    console.log(description,temperatureInCelsius,humidity,wind);

}
function fetchData(url){
    fetch(url)
    .then(response=>{
        console.log("here");
        return scrapData(response);
        
    }).then(data=>{
        console.log("here");
        showData(data);
    }).catch(error=>{
       console.log("here");
    });
}