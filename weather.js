window.addEventListener('load',()=>{
let long;
let lat;
let temperatureDescription = document.querySelector('.tmperature-description');
let temperatureDegree = document.querySelector ('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection= document.querySelector('.degree-section');
const  temperatureSpan=document.querySelector('.degree-section span');


if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
    long = position.coords.longitude;
    lat = position.coords.latitude;
      const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/cabe6ada12c17891f693543f831ed128/${lat},${long}`;
    
    fetch(api)
      .then(response => {
        return response.json();
    })
    .then(data => {
      console.log(data);
        const {temperature,summary,icon} = data.currently;
            //Set Dom Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            //change to celsius
             let celsius = (temperature - 32) * (5/9);
            //Set Icon
            setIcons(icon, document.querySelector(".icon"));
            //change f to c
            temperatureSection.addEventListener('click', ()=>{
                if( temperatureSpan.textContent==="F"){
                  temperatureSpan.textContent="c";
                  temperatureDegree.textContent = Math.floor(celsius);

                }else{
                  temperatureSpan.textContent="F";
                  temperatureDegree.textContent =temperature;                 
                }
            });
            
            
      });
   });
 } 
     function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        
        return skycons.set(iconID, Skycons[currentIcon]);
     };
});