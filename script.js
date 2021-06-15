var key = "034a6c6a724325798e1f8e5a33949fe6";
//var momento = moment().format('dddd, MMMM Do YYYY');

var cityNameEl = document.querySelector("#cityName");
var buttonEl = document.querySelector("#submitButton");
var weatherEl = document.querySelector("#weather");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uviEl = document.querySelector("#uvi");
var weatherIconEl = document.querySelector("#weatherIcon");
//var momentoEl = document.querySelector("#momento");


buttonEl.addEventListener('click', getCityname);

function getCityname(event) {
    event.preventDefault();
    var cityName = cityNameEl.value
    
    console.log(cityName);



    getLatLong(cityName);
    
    
}
  
    function getLatLong(city){
    let queryWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
                console.log(queryWeather)

            
                $.ajax({
                  'url': queryWeather,
                  'method': 'GET',
                 
                }).then(function (data) {
                  console.log(data);
                  console.log(data.main.temp);
                  console.log(data.coord.lon);
                  console.log(data.coord.lat);
                  var longitude = data.coord.lon;
                  console.log(longitude);
                  var lattitude = data.coord.lat;
                  console.log(lattitude);
                  getAllWeather(lattitude, longitude);
                  getFiveDay(lattitude, longitude);
                })
                .catch(function(err) {
                    console.error(err);
                });
               }

               function getAllWeather(lattitude, longitude){
                let askForWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + key;
                            console.log(askForWeather)
            
                        
                            $.ajax({
                              'url': askForWeather,
                              'method': 'GET',
                             
                            }).then(function (data) {
                              console.log(data);
                              console.log(data.current.temp);
                              console.log(data.current.humidity);
                              var weatherDetails = {
                                cityTemp: data.current.temp,
                                cityHumidity: data.current.humidity,
                                cityWind: data.current.wind_speed,
                                cityUvi: data.current.uvi,
                                cityWeatherIcon: data.current.weather[0].icon, 
                              }
                              console.log(weatherDetails);
                              displayWeather(weatherDetails);
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }

               function displayWeather(weatherDetails) {
                    temperatureEl.innerHTML = `Temp: ${weatherDetails.cityTemp}ºF`;
                    humidityEl.innerHTML = `Humidity: ${weatherDetails.cityHumidity}`;
                    windEl.innerHTML =  `Wind: ${weatherDetails.cityWind}`;      
                    uviEl.innerHTML =  `UVI: ${weatherDetails.cityUvi}`;
                    weatherIconEl.innerHTML = "<img src='https://openweathermap.org/img/w/"+ weatherDetails.cityWeatherIcon + ".png'>";
                    //momentoEl.innerHTML =  `${momento}`;
                
                
                
              }

   
            

            

              function getFiveDay(lattitude, longitude){
                let askFiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + key;
                            console.log(askFiveDay)
            
                        
                            $.ajax({
                              'url': askFiveDay,
                              'method': 'GET',
                             
                            }).then(function (data){
                              console.log(data);
                              console.log(data.daily[0].temp.day)  
                              //console.log(data.daily.slice(0,5))
                              //var fiveDayForecast = data.daily.slice(0,5)  
                              //console.log(fiveDayForecast.humidity);
                              //displayWeather(fiveDayForecast[i])}
                              for (var i = 0; i <  data.daily.length; i++) {
                                if (i === 5)  break;
                                var days = data.daily[i]
                                
                                console.log(days);
                                console.log(days.temp.day);
                                console.log(days.humidity);
                                console.log(days.wind_speed);
                                console.log(days.uvi);
                                console.log(days.weather[0].icon);
                                var fiveDayDetails = {
                                    fiveDayTemp: days.temp.day,
                                    fiveDayHumidity: days.humidity,
                                    fiveDayWind: days.wind_speed,
                                    fiveDayUvi: days.uvi,
                                    fiveDayWeatherIcon: days.weather[0].icon, 
                                  
                                }
                                displayFiveDay(fiveDayDetails);
                                
                              }

                              
                             
                              
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }


                           function displayFiveDay(fiveDayDetails, fiveDayBody){
                            var fiveDayEl = document.querySelector("#fiveDay");

                            var fiveDayBody = document.createElement('div');
                            fiveDayBody.classList.add('card');
                            fiveDayBody.classList.add('bg-secondary');
                            fiveDayBody.classList.add('text-white');
                            fiveDayEl.append(fiveDayBody);

                            var fiveDayTempBody = document.createElement('div');
                            fiveDayTempBody.append(fiveDayDetails.fiveDayTemp);
                            fiveDayTempBody.innerHTML = `Temp: ${fiveDayDetails.fiveDayTemp}ºF`;
                            fiveDayBody.appendChild(fiveDayTempBody);

                            var fiveDayHumidityBody = document.createElement('div');
                            fiveDayHumidityBody.append(fiveDayDetails.fiveDayHumidity);
                            fiveDayHumidityBody.innerHTML = `Humidity: ${fiveDayDetails.fiveDayHumidity}`;
                            fiveDayBody.appendChild(fiveDayHumidityBody);

                            var fiveDayWindBody = document.createElement('div');
                            fiveDayWindBody.append(fiveDayDetails.fiveDayWind);
                            fiveDayWindBody.innerHTML = `Wind: ${fiveDayDetails.fiveDayWind}`;
                            fiveDayBody.appendChild(fiveDayWindBody);

                            var fiveDayUviBody = document.createElement('div');
                            fiveDayUviBody.append(fiveDayDetails.fiveDayUvi);
                            fiveDayUviBody.innerHTML = `UVI: ${fiveDayDetails.fiveDayUvi}`;
                            fiveDayBody.appendChild(fiveDayUviBody);

                            var fiveDayWeatherIconBody = document.createElement('div');
                            fiveDayWeatherIconBody.append(fiveDayDetails.fiveDayWeatherIcon);
                            fiveDayWeatherIconBody.innerHTML = "<img src='https://openweathermap.org/img/w/"+ fiveDayDetails.fiveDayWeatherIcon + ".png'>";
                            fiveDayBody.appendChild(fiveDayWeatherIconBody);
                           }

                          