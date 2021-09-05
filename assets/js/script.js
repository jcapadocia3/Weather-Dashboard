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

var searchButton = $("#searchButton");

searchButton.on("click", citySearch);

function citySearch(e) {
  e.preventDefault();
  console.log("it works");

  var key = "3a150e01056da8ad0b1ee8083da97feb";
  var city = $("#searchInput").val();
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  console.log(url);

  // fetch(url, {
  //     method: 'GET',
  //   })
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //   })
  // };

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

      var timeUTC = new Date(response.dt * 1000);
      currentName.append(
        response.name + " " + timeUTC.toLocaleDateString("en-US")
      );
      currentName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );

      var currentWeather = currentName.append("<p>");
      currentName.append(currentWeather);
      currentWeather.append(
        "<p>" + "Temperature: " + response.main.temp + " F" + "</p>"
      );
      currentWeather.append(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      );
      currentWeather.append(
        "<p>" + "Wind Speed: " + response.wind.speed + " mph" + "</p>"
      );

      var uvURL = `https://api.openweathermap.org/data/2.5/uvi?q=&lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}`;

      fetch(uvURL, {
        method: "GET",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          currentWeather.append("<p>" + "UV Index: " + response.value + "</p>");
        });
    });
}
