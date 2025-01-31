let cityname=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_temperature=document.querySelector(".weather_temperature");
let w_icon=document.querySelector(".weather_icon");
let w_minTem=document.querySelector(".weather_min");
let w_maxTem=document.querySelector(".weather_max");


let w_feelsLike=document.querySelector(".weather_feelslike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");

let city_search=document.querySelector(".weather_search");

let city='pune';
city_search.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityname=document.querySelector(".city_name");
    console.log(cityname.value);
    city=cityname.value;
    getweather();
})
const getcountryname=(code)=>{
    return new Intl.DisplayNames([code],{type:"region"} ).of(code);
}; 

const getDateTime=(dt)=>{
    const curdate=new Date(dt*1000);
    console.log(curdate);

    const options={
        weekday : "long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
         
    };
    const formatter= new Intl.DateTimeFormat("en-us",options);
    return formatter.format(curdate);
};

//search functionality


const getweather=async()=>{
    const apiKey = 'caa27f8051e79d93e7c8176493e119ba';
    
    const weatherUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


    try{
        const res=await fetch(weatherUrl); 
        const data=await res.json();
        console.log(data);
   
        const {main,name,weather,wind,sys,dt}=data;
       cityname.innerHTML=`${name}, ${getcountryname(sys.country)}`;
    //    cityname.innerHTML=name;
        dateTime.innerHTML=getDateTime(dt);
           
        const weatherIconCode = weather[0].icon;  // Get the icon code
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIconCode}.png" alt="${weather[0].main}">`;

        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTem.innerHTML=`Min : ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML=`Min : ${main.temp_max.toFixed()}&#176`;

         w_feelsLike.innerHTML=  `${main.w_feelsLike.toFixed(2)}&#176`;
         w_humidity.innerHTML=`${main.w_humidity}%`;
         w_wind.innerHTML=`${wind.speed} m/s`;
         w_pressure.innerHTML=`${main.w_pressure} hPa`;
    }catch(error){
        console.log(error);  
        
    }
};

// document.body.addEventListener("load",getweatherdata()); 
window.addEventListener("load", getweather);
 