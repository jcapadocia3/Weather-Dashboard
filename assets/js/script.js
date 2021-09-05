$("#searchButton").click(function() {
  city = $("#searchInput").val();
  // fetchAPI();

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
  };
});
$(".list-group-item").click(function() {
  city = $(this).text();
  // fetchAPI();
});




var searchHistory = [];

function getItems() {
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory !== null) {
        searchHistory = storedHistory;
    };

    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
          }

          historyButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });

        historyButton.text(searchHistory[i]);
        $("#searchList").append(historyButton);
    }
};

getItems();





//  http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}


// var searchForm = document.getElementById("search");

// searchForm.addEventListener("click", searchButtonHandler);

// function searchCity() {
//     event.preventDefault();
  
//     var city = searchForm1.value.trim();

//     localStorage.setItem("city", JSON.stringify(city));
//     console.log("STORED!")

// };



        


// var $searchButton = $("#searchButton");
// var $searchInput = $("#searchInput");

// function searchButtonHandler() {
//   var searchInput = $searchInput.val();
//   var apiKey = "3a150e01056da8ad0b1ee8083da97feb";
//   var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}`;

//   $.ajax({
//     url: weatherUrl,
//     success: function(data) {
//       console.log(data);

//       var appendedDates = [];
//       var appendedCount = 0;

//       for (let i=0; i < data.list.length; i++) {
//         var curr = data.list[i];
//         var currDateText = curr.dt_txt;
//         var currDate = currDateText.split(" ")[0];

//         if (!appendedDates.includes(currDate)) {
//           appendedDates.push(currDate);
//           var temp = curr.main.temp;

//           $("#searchlist").append(
//             getPanelHTML(currDateText, temp)
//           )
//           appendedCount++;
//           if (appendedCount > 4) {
//             break;
//           }
//         }
//       }
//     }
//   })
// };

// $searchButton.click(searchButtonHandler);




// $("#searchButton").click(function citySearch() {

var searchButton = $("#searchButton");

searchButton.on("click", citySearch);

function citySearch() {    
console.log("it works")    
var key = "3a150e01056da8ad0b1ee8083da97feb";
var city = $("#searchInput").val();
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

fetch(url, {
    method: 'GET',
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
};
