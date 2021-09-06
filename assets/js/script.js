var searchButton = $("#searchButton");
var key = "3a150e01056da8ad0b1ee8083da97feb";
var city = $("#searchInput").val();

$("#searchButton").click(function () {
  city = $("#searchInput").val();

  var checkArray = searchHistory.includes(city);

  if (checkArray == true) {
    return;
  } else {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    var historyButton = $("<a>").attr({
      class: "list-group-item list-group-item-action",
      href: "#",
    });
    historyButton.text(city);
    $("#searchList").append(historyButton);
  }
});
$(".list-group-item").click(function () {
  city = $(this).text();
});

var searchHistory = [];

function getItems() {
  var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (storedHistory !== null) {
    searchHistory = storedHistory;
  }

  for (i = 0; i < searchHistory.length; i++) {
    if (i == 8) {
      break;
    }

    historyButton = $("<a>").attr({
      class: "list-group-item list-group-item-action",
      href: "#",
    });

    historyButton.text(searchHistory[i]);
    $("#searchList").append(historyButton);
  }
}

getItems();



function callFunctions(e) {
  // location.reload(true);
  citySearch(e);
  fiveDay(e);
};

function citySearch(e) {
  e.preventDefault();
  console.log("it works");

  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  console.log(url);

  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var cityChoice = $(".cityChoice").append("<div>").addClass("currentCity");
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

      var uvURL = `https://api.openweathermap.org/data/2.5/uvi?q=&lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}`;

      fetch(uvURL, {
        method: "GET",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          currentWeather.append("<span>" + "UV Index: " + response.value + "</span>");
          if (response.value <= 2) {
            $("span").addClass("borderGreen");
          };
          if (response.value > 2 && response.value <= 5) {
            $("span").addClass("borderYellow");
          };
          if (response.value > 5) {
            $("span").addClass("borderRed");
          };
        });
    });
  }

function fiveDay(e) {
  e.preventDefault();
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial",
    method: "GET"
  })
    .then(function (response) {
      console.log("this is response", response);
      for (i = 0; i < 5; i++) {

        var newItem = $("<div>");
        $(".fiveDay").append(newItem);

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
}


// function fiveDay(e) {
//   e.preventDefault();
//   $.ajax({
//     url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial",
//     method: "GET"
//   })
//     .then(function (response) {
//       console.log("this is response", response);
//       for (i = 0; i < 5; i++) {
        
//         var newItem = $("<div>");
//         $(".fiveDay").append(newItem);

//       // var date = new Date(response.list.dt * 1000);
//       // var dateInfo = $("#date");
//       // dateInfo.text(date.toLocaleDateString());

//       // var iconCode = response.list.weather[0].icon;
//       // var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
//       // var icon = $("#icon")
//       // icon.html($("<img>").attr("src", iconURL));

//       var temp = response.list[i].main.temp;
//       var tempInfo = $("#temperature")
//       tempInfo.text("Temp: " + temp + " F");

//       var humidity = response.list[i].main.humidity;
//       var humidityInfo = $("#humidity")
//       humidityInfo.text("Humidity: " + humidity);

//       var wind = response.list[i].wind.speed;
//       var windInfo = $("#wind")
//       windInfo.text("Wind: " + wind + " mph");
//       }
//     })
// }

searchButton.on("click", callFunctions);