const inputbox=document.getElementById("input")
const form=document.querySelectorAll("form")
const submit=document.getElementById('button')
const display=document.getElementById('display')
const apikey="7546044ceb5d49da0267397faa36cdd3"
const displayForecast=document.getElementById("displayForecast")

submit.addEventListener('click',(e) =>{
    e.preventDefault();
    checkCity(inputbox.value)
})

function checkCity(input){
    if(!input){
        alert("enter a city name")
        return
    }
    display.innerHTML = "";
    displayForecast.innerHTML = "";
    fetchWeather(input)
    forecast(input)
}
    
async function fetchWeather(input){   
  try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apikey}`)
        if(!response.ok){
            alert("City not found")
            return
        }
        const data=await response.json()
        const displayDate=formatDate(data);
        const tempertature=formatTempature(data);
       
        
        display.innerHTML+=`
                            <p>City: ${data.name}  |
                           Country: ${data.sys.country}  |
                           Date: ${displayDate}<br>
                           Temperature: ${tempertature}°C  |
                           Description: ${data.weather[0].description}  |
                           Humidity: ${data.main.humidity} %  |
                           Wind Speed: ${data.wind.speed} m/s <br>
                           <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon"></img>
                           </p>`;
        console.log(data)

    }
    catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching the weather data. Please try again.");
    }
}

function formatDate(data){
    const date=data.dt;
    const formatteddate=new Date(date*1000)
    return formatteddate;
}

function formatTempature(data){
    const temp=data.main.temp;
    const convertToCelsius=(temp-273.15).toFixed(2)
    return convertToCelsius;
}

async function forecast(input){
    const res=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apikey}`)
    try{
        if(!res.ok){
            alert("City not found")
            return
        }

        const dataset=await res.json()
        const fivedaysforecast=dataset.list.filter((_,index)=>index%8==0)
        // displayForecast.innerHTML=`<h3>5 Days Forecast</h3>`;
        fivedaysforecast.forEach(element => {
            displayForecast.innerHTML+=`<p>Date: ${formatDate(element)}<br>
                                        Tempertaure: ${formatTempature(element)}°C<br>
                                        Description: ${element.weather[0].description}<br>
                                        <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="Weather Icon"></img><br></p>`
        });

        console.log(fivedaysforecast)
    }

    catch(error){
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching the weather data. Please try again.");
    }
}