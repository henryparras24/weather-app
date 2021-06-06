var key = "034a6c6a724325798e1f8e5a33949fe6";

var cityNameEl = document.querySelector("#cityName");
var buttonEl = document.querySelector("#submitButton");
var weatherEl = document.querySelector("#weather");

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
                  
                })
                .catch(function(err) {
                    console.error(err);
                });
               }



               //function printWeather(data, resultBody) {
                    //console.log(data);
              
                //resultBody.append(data);
                
                
                
              //}


            //   var data = data;
            //   var weather = document.querySelector("#weather");

            //     var resultBody = document.createElement('div');
            //     resultBody.classList.add('card2');
            //     weather.append(resultBody);

