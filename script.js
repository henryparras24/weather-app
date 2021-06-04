var key = "034a6c6a724325798e1f8e5a33949fe6";

var cityNameEl = document.querySelector("#cityName");
var buttonEl = document.querySelector("#submitButton");
var weatherEl = document.querySelector("#weather");

buttonEl.addEventListener('click', getCityname);

function getCityname(event) {
    event.preventDefault();
    var cityName = cityNameEl.value
    
    console.log(cityName);



    displayWeatherResults(cityName);

}
  
    function displayWeatherResults(city){
    let queryWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
                console.log(queryWeather)

            
                $.ajax({
                  'url': queryWeather,
                  'method': 'GET',
                 
                }).then(function (response) {
                  console.log(response);
                  var businesses = response.businesses;
                  var weather = document.querySelector("#weather");
    
                    var resultBody = document.createElement('div');
                    resultBody.classList.add('card2');
                    weather.append(resultBody);
                //   for (var i = 0; i < 10; i++) {
                //     // console.log(businesses[i].name);
                //     // console.log(businesses[i].url);
                    
                //     printRes(businesses[i], resultBody);
                //   }
                })
                .catch(function(err) {
                    console.error(err);
                });
               }

