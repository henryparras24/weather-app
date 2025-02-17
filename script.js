var key = "034a6c6a724325798e1f8e5a33949fe6";
var momento = moment().format('dddd');
var moment5day = [moment().add(1, 'days').format("dddd"), moment().add(2, 'days').format("dddd"), moment().add(3, 'days').format("dddd"), moment().add(4, 'days').format("dddd"), moment().add(5, 'days').format("dddd")]


var cityNameEl = document.querySelector("#cityName");
var buttonEl = document.querySelector("#submitButton");
var weatherEl = document.querySelector("#weather");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uviEl = document.querySelector("#uvi");
var weatherIconEl = document.querySelector("#weatherIcon");
var momentoEl = document.querySelector("#momento");
var chosenCityEl = document.querySelector("#chosenCity");
var navEl = document.querySelector("#nav")
var sideNavEl = document.querySelector("#mySidenav")

buttonEl.addEventListener('click', getCityname);

// Execute a function when the user releases a key on the keyboard
cityNameEl.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submitButton").click();
  }
});

function getCityname(event) {
    event.preventDefault();
    var cityName = cityNameEl.value
    
    console.log(cityName);

    storeStuff();
    renderStuff();

    getLatLong(cityName);
    // if (cityNameEl.value === "Las Vegas"){

    //   document.body.style.backgroundImage = "url('lasvegaszoom.jpeg')";

    //  } else {
        
    //     document.body.style.background = black;
    //   }
    
    
}
  
    function getLatLong(city){
    let queryWeather = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + key;
                console.log(queryWeather)

            
                $.ajax({
                  'url': queryWeather,
                  'method': 'GET',
                 
                }).then(function (data) {
                  console.log(data);
                  // loop through array

                  for (var i = 0; i < data.length; i++) {
                      const firstElement = data[0];
                  // console.log(data.main.temp);
                  console.log(firstElement.lon);
                  console.log(firstElement.lat);
                  console.log(firstElement.name);
                  var longitude = firstElement.lon;
                  console.log(longitude);
                  var lattitude = firstElement.lat;
                  console.log(lattitude);
                  var thisCity = firstElement.name  + ", " + firstElement.state;
                  getAllWeather(lattitude, longitude, thisCity);
                  getFiveDay(lattitude, longitude);
                  getFiveDayTemp(lattitude, longitude);

                  }
                })

            

                .catch(function(err) {
                    console.error(err);
                });
               }

               function getAllWeather(lattitude, longitude, city){
                let askForWeather = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + key;
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
                              displayWeather(weatherDetails, city);
                              makeVisible();
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }

               function displayWeather(weatherDetails, city) {
                    
                    temperatureEl.innerHTML = `Temp: ${weatherDetails.cityTemp}ºF`;
                    humidityEl.innerHTML = `Humidity: ${weatherDetails.cityHumidity}%`;
                    windEl.innerHTML =  `Wind: ${weatherDetails.cityWind} mph`;      
                    uviEl.innerHTML =  `UVI: ${weatherDetails.cityUvi}`;
                    weatherIconEl.innerHTML = "<img src='https://openweathermap.org/img/w/"+ weatherDetails.cityWeatherIcon + ".png'>";
                    momentoEl.innerHTML =  `${momento}`;
                    chosenCityEl.innerHTML = `${city}`;
                
                    if (weatherDetails.cityUvi < 5){
                        uviEl.classList.add("badge1");
                    } else if (weatherDetails.cityUvi > 5 && weatherDetails.cityUvi <= 7){
                        uviEl.classList.add("badge2");
                     } else {
                        uviEl.classList.add("badge3");
                    }
              }

   
            

            

              function getFiveDay(lattitude, longitude){
                let askFiveDay = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + key;
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
                              var fiveDayEl = document.querySelector("#fiveDay");
                              fiveDayEl.innerHTML = ""

                              var fiveDayMomentEl = document.querySelector("#fiveDayMoment");
                              fiveDayMomentEl.innerHTML = ""
                              
                              for (var i = 0; i < moment5day.length; i++) {

                                var moments = moment5day[i]

                                console.log(moments)

                                renderMoments(moments);
                              }

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
                                    //fiveDayUvi: days.uvi,
                                    fiveDayWeatherIcon: days.weather[0].icon, 
                                  
                                }
                                displayFiveDay(fiveDayDetails);
                                
                              }

                              
                             
                              
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }

                          
              function getFiveDayTemp(lattitude, longitude){
                let askFiveDay = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + key;
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
                              var fiveDayEl = document.querySelector("#fiveDayTemp");
                              fiveDayEl.innerHTML = ""

                            
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
                                    //fiveDayUvi: days.uvi,
                                    fiveDayWeatherIcon: days.weather[0].icon, 
                                  
                                }
                                displayFiveDayTemp(fiveDayDetails);
                                
                              }

                              
                             
                              
                            })
                            .catch(function(err) {
                                console.error(err);
                            });
                           }


                           function renderMoments(moments){
                            var fiveDayEl = document.querySelector("#fiveDayMoment");

                            var fiveDayBody = document.createElement('div');
                            fiveDayBody.classList.add('heightForty');
                            fiveDayBody.classList.add('paddington');
                            // fiveDayBody.classList.add('roundedCorners');
                            // fiveDayBody.classList.add('leGrey');
                            fiveDayBody.classList.add('marginFiveDay');
                            fiveDayBody.classList.add('text-white');
                            fiveDayEl.append(fiveDayBody);

                            var fiveDayMomentBody = document.createElement('div');
                            fiveDayMomentBody.append(moments);
                            fiveDayMomentBody.innerHTML = `${moments}`;
                            fiveDayBody.appendChild(fiveDayMomentBody);
                           }



                           function displayFiveDay(fiveDayDetails, fiveDayBody){
                            var fiveDayEl = document.querySelector("#fiveDay");
                            
                            var fiveDayBody = document.createElement('div');
                            // fiveDayBody.classList.add('card');
                            fiveDayBody.classList.add('marginFiveDayIcon');
                            fiveDayBody.classList.add('text-white');
                            fiveDayEl.append(fiveDayBody);

                            var fiveDayWeatherIconBody = document.createElement('div');
                            fiveDayWeatherIconBody.classList.add('inputMargin');
                            fiveDayWeatherIconBody.append(fiveDayDetails.fiveDayWeatherIcon);
                            fiveDayWeatherIconBody.innerHTML = "<img src='https://openweathermap.org/img/w/"+ fiveDayDetails.fiveDayWeatherIcon + ".png' style='width:40px;height:40px;'>";
                            fiveDayBody.appendChild(fiveDayWeatherIconBody);

                            // var fiveDayTempBody = document.createElement('div');
                            // fiveDayTempBody.append(fiveDayDetails.fiveDayTemp);
                            // fiveDayTempBody.innerHTML = `${fiveDayDetails.fiveDayTemp}ºF`;
                            // fiveDayBody.appendChild(fiveDayTempBody);

                            // var fiveDayHumidityBody = document.createElement('div');
                            // fiveDayHumidityBody.append(fiveDayDetails.fiveDayHumidity);
                            // fiveDayHumidityBody.innerHTML = `Humidity: ${fiveDayDetails.fiveDayHumidity}`;
                            // fiveDayBody.appendChild(fiveDayHumidityBody);

                            // var fiveDayWindBody = document.createElement('div');
                            // fiveDayWindBody.append(fiveDayDetails.fiveDayWind);
                            // fiveDayWindBody.innerHTML = `Wind: ${fiveDayDetails.fiveDayWind}`;
                            // fiveDayBody.appendChild(fiveDayWindBody);

                            // var fiveDayUviBody = document.createElement('div');
                            // fiveDayUviBody.append(fiveDayDetails.fiveDayUvi);
                            // fiveDayUviBody.innerHTML = `UVI: ${fiveDayDetails.fiveDayUvi}`;
                            // fiveDayBody.appendChild(fiveDayUviBody);

                            
                            }


                            function displayFiveDayTemp(fiveDayDetails, fiveDayBody){
                              var fiveDayEl = document.querySelector("#fiveDayTemp");
                              
                              var fiveDayBody = document.createElement('div');
                              fiveDayBody.classList.add('heightForty');
                              fiveDayBody.classList.add('paddington');
                              fiveDayBody.classList.add('marginFiveDay');
                              fiveDayBody.classList.add('text-white');
                              fiveDayEl.append(fiveDayBody);
  
                              var fiveDayTempBody = document.createElement('div');
                              fiveDayTempBody.append(fiveDayDetails.fiveDayTemp);
                              fiveDayTempBody.innerHTML = `${fiveDayDetails.fiveDayTemp}ºF`;
                              fiveDayBody.appendChild(fiveDayTempBody);
                            }   
                          

  function storeStuff(){
      localStorage.setItem("city", cityNameEl.value)

  }         
  
  function renderStuff(){
    //loop through all the stored cities
    //document.getElementById("renderCity").innerHTML = localStorage.getItem("city");
    // 
    var city = localStorage.getItem("city");

    var searchedCitiesEl = document.querySelector("#searchedCities");
    

    // var renderSearchedCities = document.createElement('div');
    // renderSearchedCities.classList.add('card');
    // renderSearchedCities.classList.add('bg-primary');
    // renderSearchedCities.classList.add('text-white');
    // searchedCitiesEl.append(renderSearchedCities);



    var renderCity = document.createElement('button');
    renderCity.classList.add('roundedCorners10');
    renderCity.classList.add('smoke');
    renderCity.classList.add('buttonWidthForCities');
    renderCity.classList.add('buttonBorder');
    renderCity.classList.add('marginB');
    // renderCity.classList.add('marginSearch');
    renderCity.innerHTML = `<i class="fas fa-search"></i> ${city}`;
    renderCity.setAttribute("data-city", city);
    sideNavEl.appendChild(renderCity);

  }

  var searchedCitiesEl = document.querySelector("#mySidenav");
  searchedCitiesEl.addEventListener("click", function(event){
    console.log(event.target);
    if (event.target.matches("button")){

      var citiesss = event.target.getAttribute("data-city");
      console.log(citiesss);
      getLatLong(citiesss);
    }

  })

  // Background image attempt

  // if (cityNameEl.value === "Los Angeles"){

  //   document.body.style.backgroundImage = "url('lazoom.jpeg')";
  // }


navEl.addEventListener('click', openNav);


  /* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function makeVisible () {
  document.getElementById("nav").style.visibility = "visible";
}

