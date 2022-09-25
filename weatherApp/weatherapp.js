const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  function setQuery(evt){
    if(evt.keyCode == 13)
    {
      getResults(searchbox.value);
    }
    function getResults(cityName){
      const url = `${api.base}weather?q=${cityName}&units=${api.units}&appId=${api.key}`;
      fetch(url).then((response)=>{
        console.log(response);
        return response.json();
      }).then((responseJson)=>{
        console.log(responseJson)
        if(responseJson.cod === 200){
          displayResults(responseJson)
        }
      }).catch((err)=>{
        console.log("Error in calling API ",err);
      })
    }
  }
  function displayResults(responseJson){
    let city = document.querySelector(".city");  
    city.innerText = `${responseJson.name}, ${responseJson.sys.country}`;
    let temp = document.querySelector(".temp");
    temp.innerText = `${responseJson.main.temp}`;
    let weather = document.querySelector(".weather");
    weather.innerText = `${responseJson.weather[0].main}`;
    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${responseJson.main.temp_min}°C / ${responseJson.main.temp_max}°C`;
    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);
  }
  function dateBuilder(date){
    const dateOptions = {
      month:'long',
      day:'numeric',
      year:'numeric',
      weekday:'long'
    }
    return date.toLocaleDateString("en-us", dateOptions);
  }