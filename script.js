var key = "034a6c6a724325798e1f8e5a33949fe6";

var cityNameEl = document.querySelector("#cityName");
var buttonEl = document.querySelector("#submitButton");
var weatherEl = document.querySelector("#weather");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uviEl = document.querySelector("#uvi");
var weatherIconEl = document.querySelector("#weatherIcon");


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
                })
                .catch(function(err) {
                    console.error(err);
                });
               }

               function getAllWeather(lattitude, longitude){
                let askForWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&appid=" + key;
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
                              }
                              console.log(weatherDetails);
                              displayWeather(weatherDetails);
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }

               function displayWeather(weatherDetails) {
                    temperatureEl.innerHTML = weatherDetails.cityTemp;
                    humidityEl.innerHTML = weatherDetails.cityHumidity;
                    //windEl.innerHTML =        
                    //uviEl.innerHTML = 
                    //weatherIconEl.innerHTML =
               
                
                
                
              }


            

            

