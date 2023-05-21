$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
  
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var city = $("#city").val();
        if (city !== "") {
            getLatLon(city);
            addToRecentSearches(city);
      }
    });
  
    $("#recent-searches-list").on("click", "li.list-group-item", function () {
        var city = $(this).text();
        getCityWeather(city);
    });
  
    $("#city-info, #forecast, #recent-searches").hide();
  
    getRecentSearches();
  
    function getLatLon(city) {
        var api_key = "fa12e56f847c2ed6ba203455ba863cf5";
        var baseURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
    
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                var newURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${api_key}`;
                getCityWeather(newURL);
            });
    }
  
    function getCityWeather(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
            $("#city-name").text(data.name);
            $("#date-today").text(`(${dayjs().format("MM/DD/YYYY")})`);
            $("#weather-icon").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            $("#temperature").text(data.main.temp + " F");
            $("#humidity").text(data.main.humidity + " %");
            $("#wind-speed").text(data.wind.speed + " MPH");
            var id = data.id;
            getWeekForecast(id);
        });
    }
  
    function getWeekForecast(id) {
        var api_key = "fa12e56f847c2ed6ba203455ba863cf5";
        var baseURL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=${api_key}`;

        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
            var cardHTML = data.list
                .filter((_, index) => (index + 1) % 8 === 1)
                .map(item => {
                var weatherIcon = item.weather[0].icon;
                var dateArr = item.dt_txt.split(" ")[0].split("-");
                var newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
                return `<div class="card text-white bg-dark m-2 p-auto" style="width: 11rem;">
                    <div class="card-header text-center fw-bold">${newDate}</div>
                    <div class="card-body">
                    <p class="card-text text-center">
                        <img id="weather-icon" src="https://openweathermap.org/img/wn/${weatherIcon}.png"/>
                    </p>
                    <p class="card-text">
                        Temp: ${item.main.temp} F
                    </p>
                    <p class="card-text">
                        Humidity: ${item.main.humidity}%
                    </p>
                    </div>
                </div>`;
                })
                .join("");
            $("#city-week-forecast").html(cardHTML);
            });
    }
  
    function addToRecentSearches(city) {
        $("#recent-searches").show();
        cities.unshift
        ({ city });
        if (cities.length > 5) {
            cities.pop();
        }

    localStorage.setItem("cities", JSON.stringify(cities));
    renderRecentSearches();
      }
      
    function getRecentSearches() {
        renderRecentSearches();
        }
      
    function renderRecentSearches() {
        var recentCities = JSON.parse(localStorage.getItem("cities")) || [];
            $("#recent-searches-list").empty();
            if (recentCities.length > 0) {
                recentCities.forEach(recentCity => {
                    var newCity = $("<li>").addClass("list-group-item").text(recentCity.city);
                    $("#recent-searches-list").prepend(newCity);
                    });
                $("#recent-searches").show();
                } else {
                $("#recent-searches").hide();
                }}
            $(".clear").on("click", function () {
                localStorage.removeItem("cities");
                $("#recent-searches-list").empty();
            });
});




// Original
$(document).ready(function() {
	// Local Storage
	var cities = localStorage.getItem('city');
	if (cities) {
		cities = JSON.parse(cities);
	} else {
		cities = [];
	}
	// Onclick function event
	$("#search-button").on("click", function(event) {
	  event.preventDefault();
	  var city = $("#city").val();
	  if (city === "") {
		return;
	  } else {
		getLatLon (city);	
		addToRecentSearches(city);
	  }
	});
  
	// Recent Searches
	$("#recent-searches-list").on("click", "li.list-group-item", function() {
	  var city = $(this).text();
	  getCityWeather(city);
	});
  
	// Hide Elements 
	$("#city-info").hide();
	$("#forecast").hide();
  
	// Recent Searches
	getRecentSearches();
  
	// Latitude & Longitude for weather app
	function getLatLon (city) {
	  $("#city-info").show();
  
	  var api_key = "fa12e56f847c2ed6ba203455ba863cf5";
	  var baseURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
  
	  fetch(baseURL)
  	
	  .then(function(response) {
		return response.json();
	  })
	  .then(function (data) {
		var newURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${api_key}`;
        console.log(data);
        getCityWeather(newURL);
	 })
	};

	function getCityWeather(url) {
		fetch(url)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			console.log(data)
			$("#city-name").text(data.name);
			$("#date-today").text(`(${dayjs().format('MM/DD/YYYY')})`);
			$("#weather-icon").attr(
				"src",
				`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
			);
			$("#temperature").text(data.main.temp + " F");
			$("#humidity").text(data.main.humidity + " %");
			$("#wind-speed").text(data.wind.speed + " MPH");
  		var id = data.id;
		getWeekForecast(id);
	  });
	}

  
	// Five Day forecast
	function getWeekForecast(id) {
	  $("#forecast").show();
  
	  var api_key = "fa12e56f847c2ed6ba203455ba863cf5";
	  var baseURL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=${api_key}`;
  
	  fetch(baseURL)
  	
		.then(function(response) {
			return response.json();
	  	})
		.then(function (data) {
			console.log(data);
			var cardHTML = "";
			for (var i = 1; i < data.list.length; i +=8) {
			var weatherIcon = data.list[i].weather[0].icon;
  		  	var dateStr = data.list[i].dt_txt;
		  	var dateStrArr = dateStr.split(" ");
		  	var date = dateStrArr[0];
		  	var dateArr = date.split("-");
		  	var newDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
			cardHTML += `<div class="card text-white bg-dark m-2 p-auto" style="width: 11rem;">
				  <div class="card-header text-center fw-bold">${newDate}</div>
				  <div class="card-body">
				  <p class="card-text text-center">
					  <img id="weather-icon" src="https://openweathermap.org/img/wn/${weatherIcon}.png"/>
				  </p>
				  <p class="card-text">
					  Temp: ${data.list[i].main.temp} F
				  </p>
				  <p class="card-text">
					  Humidity: ${data.list[i].main.humidity}%
				  </p>
				  </div>
			</div>`;
			}
			$("#city-week-forecast").html(cardHTML);
		});
	}
  
	// Adding city to recent searches
	function addToRecentSearches(city) {
	  $("#recent-searches").show();
  
	  var newCity = $("<li>");
	  newCity.addClass("list-group-item");
	  newCity.text(city);
	  $("#recent-searches-list").prepend(newCity);
	  var cityObj = {
		city: city
	  };
	  cities.push(cityObj);
  	  localStorage.setItem("searches", JSON.stringify(cities));
	}
  
	// Get Recent Searches
	function getRecentSearches() {
	  var searches = JSON.parse(localStorage.getItem("searches"));
	  if (searches != null) {
		for (var i = 0; i < searches.length; i++) {
		  var newCity = $("<li>");
		  newCity.addClass("list-group-item");
		  newCity.text(searches[i].city);
		  $("#recent-searches-list").prepend(newCity);
		}
		$("#recent-searches").show();
	  } else {
		$("#recent-searches").hide();
	  }
	}
  
  

  // Clears history
$(".clear").on("click", function() {
    localStorage.clear();
    $("#recent-searches-list").empty();
})
});