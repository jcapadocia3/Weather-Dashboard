//  http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}


// var searchForm = document.getElementById("search")

var searchForm = document.getElementById("search");

searchForm.addEventListener("click", searchCity);

function searchCity() {
    event.preventDefault();
  
    var city = searchForm1.value.trim();

    localStorage.setItem("city", JSON.stringify(city));
    console.log("STORED!")
};

// function searchCity() {

//     var getCity = !!localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : [];
//     var searchForm = document.getElementById("search").value;

//     getCity.push(searchForm);
//     localStorage.setItem('city', JSON.stringify(getCity));
//     console.log("STORED!")
// };

// var aNumber = !!localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : [];
// var number = document.getElementById('number').value;
// aNumber.push(number);
// localStorage.setItem('number', JSON.stringify(aNumber));

// var getCity = !!localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : [];
// var searchForm = document.getElementById("search").value;
// getCity.push(searchForm);
// localStorage.setItem('city', JSON.stringify(getCity));

// var getCity = function (event) {
//   var language = event.target.getAttribute('data-language');

//   if (language) {
//     getFeaturedRepos(language);

//     repoContainerEl.textContent = '';
//   }
// };
// getCity();






// var key = '3a150e01056da8ad0b1ee8083da97feb';
// var city;
// var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

// fetch(url, {
//     method: 'GET', //GET is the default.
//     credentials: 'same-origin', // include, *same-origin, omit
//     redirect: 'follow', // manual, *follow, error
//   })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

