// Variables to be used in overall code
var searchButton = $("#searchButton");
var key = "3a150e01056da8ad0b1ee8083da97feb";
var city = $("#searchInput").val();

// Begin function to save user input in local storage
$("#searchButton").click(function () {
  city = $("#searchInput").val();

  var checkArray = searchHistory.includes(city);

  if (checkArray == true) {
    return;
  } else {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    // Creates list items as links for locally stored data as the output in Search History
    // Sets output immediately when a city is searched
    var historyButton = $("<a>").attr({
      class: "list-group-item list-group-item-action",
      href: "#",
    });

    historyButton.text(city);
    $("#searchList").append(historyButton);
  }
});

// Eventlistener for any list item that is clicked in Search History
$(".list-group-item").click(function () {
  city = $(this).val();
  citySearch(e);
  fiveDay(e);
});

var searchHistory = [];

// Begin function to retrieve locally stored data and have it persist in the Search History
function getItems() {
  var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (storedHistory !== null) {
    searchHistory = storedHistory;
  }

  // For loop that will list a maximum of 8 items in Search History
  for (i = 0; i < searchHistory.length; i++) {
    if (i == 8) {
      break;
    }

    // Creates list items as links for locally stored data as the output in Search History
    // Gets locally stored data for it to persist
    historyButton = $("<a>").attr({
      class: "list-group-item list-group-item-action",
      href: "#",
    });

    historyButton.text(searchHistory[i]);
    $("#searchList").append(historyButton);
  }
};

getItems();

// Function to call API fetching functions
function callFunctions(e) {
  citySearch(e);
  fiveDay(e);
};

// Function to fetch all API data for the city searched via user input
// Used for Current Weather
function citySearch(e) {
  e.preventDefault();

  // Begin API fetch and appending of data retrieved
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var cityChoice = $(".cityInfo").append("<div>");
      cityChoice.empty();

      var currentName = cityChoice.append("<p>");
      cityChoice.append(currentName);

      var time = new Date(response.dt * 1000);
      currentName.append(response.name + " " + time.toLocaleDateString("en-US"));
      currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

      var currentWeather = currentName.append("<p>");
      currentName.append(currentWeather);
      currentWeather.append("<p>" + "Temperature: " + response.main.temp + " F" + "</p>");
      currentWeather.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
      currentWeather.append("<p>" + "Wind: " + response.wind.speed + " mph" + "</p>");

      // Begin API fetch and appending for UV index specifically
      var uvURL = `https://api.openweathermap.org/data/2.5/uvi?q=&lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}`;

      fetch(uvURL, {
        method: "GET",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          currentWeather.append(
            "<span>" + "UV Index: " + response.value + "</span>"
          );
          // Contiditional statement to add a colored border around UV index determined by the value returned
          if (response.value <= 2) {
            $("span").addClass("borderGreen");
          }
          if (response.value > 2 && response.value <= 5) {
            $("span").addClass("borderYellow");
          }
          if (response.value > 5) {
            $("span").addClass("borderRed");
          }
        })
    })
};

// Function to fetch all API data for the city searched via user input
// Used for 5 Day Forecast
function fiveDay(e) {
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial";
  e.preventDefault();

  // Begin API fetch and appending of data retrieved
  fetch(urlFiveDay, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      $(".appendedAll").remove();

      // For loop to create and append data retrieved for the next consecutive 5 days in separate <divs>
      for (i = 0; i < 5; i++) {
        var newItem = $("<div>").attr("class", "col-sm-7 bg-primary text-white rounded appendedAll");
        $(".weatherContent1").append(newItem);

        var date = new Date(response.list[i * 8].dt * 1000);
        newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");

        var iconCode = response.list[i * 8].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        newItem.append($("<img>").attr("src", iconURL));

        var temp = response.list[i * 8].main.temp;
        newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");

        var humidity = response.list[i * 8].main.humidity;
        newItem.append("<p>" + ("Humidity: " + humidity) + "<p>");

        var wind = response.list[i * 8].wind.speed;
        newItem.append("<p>" + ("Wind: " + wind + " mph") + "<p>");
      }
    })
};

// Begin event listener to call all functions needed for code
searchButton.on("click", callFunctions);
