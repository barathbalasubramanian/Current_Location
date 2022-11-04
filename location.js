
// variables 
let currentLatitude = ''
let currentLongitude = ''
let city = ''

// get current loaction
const successCallback = (position) => {
   
    currentLatitude = position.coords.latitude
    currentLongitude = position.coords.longitude
    getlocation(currentLatitude,currentLongitude)
    try {
        leafmap (currentLatitude,currentLongitude)
    }
    catch {

    }

  
};
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// watching current location
const id = navigator.geolocation.watchPosition(successCallback, errorCallback);

// get city name
async function getlocation(lat,lon) {

    await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lon+'&localityLanguage=en')
    .then (res => {
        return res.json()
    })
    .then (data => {
        currentcity(data.city)
        console.log(data.city)
        // currentLocation(data.city)
    })
    .catch (err => console.log(err))
}

var myIcon = L.icon({
    iconUrl: 'icon.ico',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});

function leafmap(lat,lon) {

let map = L.map('map').setView([lat, lon], 15);
const url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

L.tileLayer(url, { attribution }).addTo(map);

// custom location icon
// L.marker([lat,lon], {icon: myIcon}).addTo(map);

var marker = L.marker([lat, lon]).addTo(map);

// circle in map
var circle = L.circle([lat, lon], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 500
}).addTo(map);

// polygon in map 
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);


// click event

var popup = L.popup();

function onMapClick(e) {
    getlocation(e.latlng.lat,e.latlng.lng)
    console.log(e.latlng.lat,e.latlng.lng)
    console.log(city)
    popup
        .setLatLng(e.latlng)
        .setContent(' ' + city.toUpperCase())
        .openOn(map);    
}

map.on('click', onMapClick);

}

// get city name and assign to variable
function currentcity(e) {
    city = e
}

// get the input from the input box and render that location

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

btn.addEventListener('click', log);

letters = /^[A-Za-z]+$/
function log() {
    if ( input.value != '') {
        if (input.value.match(letters)) {
        currentLocation(input.value) 
        input.value = ''
        }
    }
}

function currentLocation(loc) {
    let mapper = document.querySelector('.mapper')
    let map = ''
    let yourLocation = loc
    map = `<iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src='https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${yourLocation}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>`
    mapper.innerHTML = map
    
}
