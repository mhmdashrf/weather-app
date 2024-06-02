
const locationToDay = document.querySelector('.locationToDay');
const custom1 = document.querySelector('.custom1');
const spanToDay = document.getElementById('span');
const imgToDay = document.querySelector('.img');
const todayBody = document.querySelector('.today-body');
const dateMonth = document.querySelector('.date');
const mainToday = document.querySelector('.main-today');
const dateNextDay = document.querySelector('.dateNextDay');
const innerNextDay = document.querySelector('.innerNextDay');
const smallNextDay = document.querySelector('.smallNextDay');
const custom2 = document.querySelector('.custom2');
const innerAfterNextDay = document.querySelector('.innerAfterNextDay');
const smallThirdDay = document.querySelector('.smallThirdDay');
const custom3 = document.querySelector('.custom3');
const dateAfterNextDay = document.querySelector('.dateAfterNextDay');
const searchInput = document.getElementById('search');
const imgNextDay = document.querySelector('.imgNextDay');
const imgThirdDay = document.querySelector('.imgThirdDay');
const btnSearch = document.querySelector('.btn-search');

let searchValue = searchInput.value;
let apikey = 'aa9e3abb92a24062a9d10449240206';
let result;


async function aPiLocation() {
   navigator.geolocation.getCurrentPosition(async (postion) => {
      const { latitude, longitude } = postion.coords;
      let url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${latitude},${longitude}&days=3`
      result = await (await fetch(url)).json();
      getLocationUser(result);
   })
}
function getLocationUser(result) {
   let days = new Date(result.forecast.forecastday[0].date);
   let NumMonth = days.getUTCDate();
   let dayName = days.toLocaleDateString("en-us", { weekday: 'long' });
   todayBody.innerHTML = dayName;
   locationToDay.innerHTML = result.location.name;
   spanToDay.innerHTML = result.current.temp_c;
   custom1.innerHTML = result.current.condition.text;
   dateMonth.innerHTML = NumMonth + " " + 'January';
   imgToDay.src = 'https:' + result.current.condition.icon;
   // code The Next Day  //
   let day2 = new Date(result.forecast.forecastday[1].date);
   let nameDay2 = day2.toLocaleDateString("en-us", { weekday: 'long' });
   dateNextDay.innerHTML = nameDay2;
   innerNextDay.innerHTML = result.forecast.forecastday[1].day.maxtemp_c + '<sup>o</sup>C'
   smallNextDay.innerHTML = result.forecast.forecastday[1].day.mintemp_c + '<sup>o</sup>'
   custom2.innerHTML = result.forecast.forecastday[1].day.condition.text;
   imgNextDay.src = 'https:' + result.forecast.forecastday[1].day.condition.icon
   // code The Third Day  //
   let day3 = new Date(result.forecast.forecastday[2].date);
   let nameDay3 = day3.toLocaleDateString("en-us", { weekday: 'long' });
   dateAfterNextDay.innerHTML = nameDay3;
   innerAfterNextDay.innerHTML = result.forecast.forecastday[2].day.maxtemp_c + '<sup>o</sup>C'
   smallThirdDay.innerHTML = result.forecast.forecastday[2].day.mintemp_c + '<sup>o</sup>'
   custom3.innerHTML = result.forecast.forecastday[2].day.condition.text;
   imgThirdDay.src = 'https:' + result.forecast.forecastday[2].day.condition.icon;
}
aPiLocation();
async function searchFromApi(city) {
   let url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=3`
   let searchApi = await (await fetch(`${url}`)).json();
   console.log(searchApi);
   getLocationUser(searchApi);
}
searchInput.addEventListener('keyup',function(){
   searchFromApi(searchInput.value);
})
