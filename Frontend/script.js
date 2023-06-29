const key='65c244c40e022e15c618220a60743dce';        //my api key
const callButton = document.getElementById('locationinput');
//console.log(callButton);
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
    let description='';
    let i=0;
    for(;i<weather.length-1;i++){
        description+=weather[i].description+',';

    }
    
    description+=weather[i].description;
    const obj={
        'description':description,
        'temperature':data.main.temp,
        'humidity':data.main.humidity,
        'wind':data.wind.speed
   };
    
    return obj;
}
function showData(data){
    
    const description=data.description;
    const temperature=data.temperature;
    const humidity=data.humidity;
    const wind=data.wind;
   

    const temperatureInCelsius =parseInt (parseFloat(temperature) - 273.15)+'°'+'C';
    

    document.getElementById('temp').innerHTML=temperatureInCelsius;
    document.getElementById('wind').innerHTML=wind+" km/h";
    document.getElementById('humidity').innerHTML=humidity+"%";
    document.getElementById('description').innerHTML=description;
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