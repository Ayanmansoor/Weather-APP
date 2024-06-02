let api= "9d32f8b4e8653eb56dda339740593117";


let futureDB = [];
let Weatherimg = {
  clear: { img: "imgs/clear-sky.png" },
  rain: { img: "imgs/rainSky.png" },
  cloud: { img: "imgs/cloudeSky.png" },
};
// https://api.openweathermap.org/data/2.5/weather?q=${value} &appid=${Api_key}`;

function perentForall(lat, lon) {
  TodayWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
  );
  futureWeather(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`
  );
  // UserInput()
}

function USerinput() {
  let btn = document.querySelector(".place-search-btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let input = document.querySelector(".palce-search").value;

    if (input) {
      TodayWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${input} &appid=${api}`
      );
      futureWeather(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${api}`
      );
    } else {
      GetCurrentLocation();
      confirm("should be valid place name ");
    }
  });
}
USerinput();

function GetCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        perentForall(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
GetCurrentLocation();
function TodayWeather(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      TodayWeatherbox(res);
      Humadity(res);
      visibility(res);
      feelLike(res);
      moveMAp(res.coord.lat, res.coord.lon);
    })
    .catch((error) => {
      console.log(error);
      confirm("can't find this place !")
    });
}
function futureWeather(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      futureWeatherList(res.list);
      //  res.list.forEach((element)=>{
      //   let obj = new Object();
      //   obj.temrature = Math.round(element.main.temp - 273.15);
      //   obj.place = res.city.name;
      //   obj.country = res.city.country;
      //   obj.day=new Date(element.dt_txt.slice(0,10).trim()).toLocaleString("default", { weekday: "long" })
      //   obj.time=new Date("1970-01-01T" + element.dt_txt.slice(10,).trim() + "Z").toLocaleTimeString(
      //     "en-US",
      //     { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
      //   )
      //   futureDB.push(obj);
      //

      // futureWeatherOneBox()
    })
    .catch((error) => {
      console.log(error);
      confirm("can't find this place !");
    });
}

// function futureWeatherOneBox(){
//   let currentday=new Date(new Date().toISOString().slice(0, 10)).toLocaleString("default", { weekday: "long" })
//   let currenttime=new Date("1970-01-01T" + new Date().toTimeString().slice(0,9).trim() + "Z").toLocaleTimeString(
//     "en-US",
//     { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
//   )

//   let weather=futureDB.forEach((element,index)=>{
//     if (element.day==currentday){
//       console.log(element)
//       // return element
//     }
//   })

// }

function futureWeatherList(list) {
  let perent = document.querySelector(".content-two");
  perent.innerHTML = "";
  list.forEach((element, index) => {
    let dayname = new Date(element.dt_txt.slice(0, 10).trim()).toLocaleString(
      "default",
      { weekday: "long" }
    );
    let img = "imgs/clear-sky.png";
    if (element.weather[0].description == "clear sky") {
      img = Weatherimg.clear.img;
    } else if (element.weather[0].description == "rain sky") {
      img = Weatherimg.rain.img;
    } else if (element.weather[0].description == "cloud sky") {
      img = Weatherimg.cloud.img;
    }
    let box = ` <div class="list">
    <span class="two-img">
      <img src=${img} alt="" />
    </span>
    <span class="two-temprature">
      <p>${Math.round(element.main.feels_like - 273.15)}C</p>
    </span>
    <span class="two-month">
      <small>${new Date(
        "1970-01-01T" + element.dt_txt.slice(10).trim() + "Z"
      ).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      })}</small>
    </span>
    <span class="two-day">
      <small>${dayname}</small>
    </span>
  </div>`;
    perent.insertAdjacentHTML("afterbegin", box);
  });
}

function TodayWeatherbox(res) {
  let date = new Date().toTimeString().slice(0, 9).trim();
  let perent = document.querySelector(".box-content");
  let perent1 = document.querySelector(".boxs-wraper");

  let img = "imgs/clear-sky.png";
  if (res.weather[0].description == "clear sky") {
    img = Weatherimg.clear.img;
  } else if (res.weather[0].description == "rain sky") {
    img = Weatherimg.rain.img;
  } else if (res.weather[0].description == "cloud sky") {
    img = Weatherimg.cloud.img;
  }
  console.log(img, res.weather[0].description);
  let box = `
  <div class="icon">
    <img src=${img} alt="">
  </div>
  <h2>${Math.round(res.main.temp_min - 273.15)}C</h2>
  <p>${res.weather[0].description}</p>
  <hr />
  <small>${res.name} ${res.sys.country}</small><br />
  <small>${new Date("1970-01-01T" + date + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })}</small>`;
  perent.innerHTML = box;
  perent1.innerHTML = "";
}

function Humadity(res) {
  let perent = document.querySelector(".boxs-wraper");
  let box = ` 
 
    <div class="constainer-boxs">
      <div class="first">
        <div class="first-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrD_uD0NBvCgcFpNIWOfE6eS4-b4WF2iH1Wa2KIYOFg&s"
          />
        </div>
        <div class="first-info">
          <span>wind ${res.wind.speed}<small>km/s</small></span>
          <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
        </div>
      </div>
      <div class="second">
        <p>Humidity</p>
        <div class="second-content">
        <span>${res.main.humidity}%</span>
        <span>point ${Math.round(
          res.main.temp_min - 273.15
        )}<sup>C</sup> rigth now 
        </span>
        </div>
      </div>
    </div>
  `;
  perent.insertAdjacentHTML("afterbegin", box);
}
function visibility(res) {
  let perent = document.querySelector(".boxs-wraper");
  let visibility = Number(res.main.humidity >= 80) ? 2 : 10;
  let box = ` 
    <div class="constainer-boxs">
      <div class="first">
        <div class="first-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4005/4005908.png"
          />
        </div>
        <div class="first-info">
          <span>visibility ${visibility}<small>%</small></span>
          <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
        </div>
      </div>
      <div class="second">
        <p>visibility</p>
        <div class="second-content">
        <span>${visibility}%</span>
        <span><small>Haze is effective visibility</small> 
        </span>
        </div>
      </div>
    </div>
  `;
  perent.insertAdjacentHTML("beforeend", box);
}
function feelLike(res) {
  let perent = document.querySelector(".boxs-wraper");

  let box = ` 


    <div class="constainer-boxs">
      <div class="first">
        <div class="first-img">
          <img
            src="https://t4.ftcdn.net/jpg/05/25/53/67/360_F_525536727_NjqXBXsunehFvMVv7HED5N1Jy0Y4V9dL.jpg"
          />
        </div>
        <div class="first-info">
          <span>FeelLike ${Math.round(
            res.main.feels_like - 273.15
          )}<sup>C</sup></span>
          <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
        </div>
      </div>
      <div class="second">
        <p>Feel Like</p>
        <div class="second-content">
        <span>${Math.round(res.main.feels_like - 273.15)}<sup>C</sup></span>
        <span><small>Humadity make feel hotter
        </small>
        </span>
        </div>
      </div>
    </div>
  `;
  perent.insertAdjacentHTML("beforeend", box);
}
// console.log(MoreWeatherList());
function CurrentFutureWeather() {
  const timeString12hr = new Date(
    "1970-01-01T" + timeString + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

function showMap() {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    .openPopup();
  var circle = L.circle([51.508, -0.11], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  var popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on("click", onMapClick);
}

var map = L.map("map").setView([19.076, 72.8777], 10);
// layer of map
function streetviews() {
  // var Esri_WorldImagery = L.tileLayer(
  //   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  //   {
  //     attribution:
  //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  //   }
  // ).addTo(map);
  var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
  }).addTo(map)
  var OpenWeatherMap_Clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
    apiKey: '<insert your api key here>',
    opacity: 0.5
  }).addTo(map)
  var OpenWeatherMap_Pressure = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid={apiKey}', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
    apiKey: '<insert your api key here>',
    opacity: 0.5
  }).addTo(map)
  var OpenWeatherMap_Wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid={apiKey}', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
    apiKey: '<insert your api key here>',
    opacity: 0.5
  }).addTo(map)
  var NASAGIBS_ModisTerraChlorophyll = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_L2_Chlorophyll_A/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
    minZoom: 1,
    maxZoom: 7,
    format: 'png',
    time: '',
    tilematrixset: 'GoogleMapsCompatible_Level',
    opacity: 0.75
  }).addTo(map)
}
streetviews();

function moveMAp(lat, lon) {
  map.flyTo([lat, lon], 10, {
    animate: true,
    duration: 3,
  });
}

// function for add loction on LocalStorage

function hide() {
  let btn, overlay;
  btn = document.querySelector(".Location-btn");
  overlay = document.querySelector(".overlay");
  let num = true;
  return () => {
    btn.addEventListener("click", (e) => {
      console.log(overlay);

      if (num) {
        overlay.style.opacity = "1";
        overlay.style.display = "block";
        num=false;
      } else {
        overlay.style.opacity = "0";
        overlay.style.display = "none";
        num=true;
      }
    });
  };
}
hide()();
function storeLocation() {
  let btn = document.querySelector(".location-btn");
  btn.addEventListener("click", () => {
    let Userinputvalue = document.querySelector(".Add-loction").value;
    if (Userinputvalue) {
      let obj = {
        location: Userinputvalue,
      };
      console.log(obj);
      AddTolocalstorage(obj);
    }
  });
}
storeLocation();

function AddTolocalstorage(obj) {
  // ShowData();
  if (obj.location) {
    TodayWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${obj.location} &appid=${api}`
    );
    futureWeather(
      `https://api.openweathermap.org/data/2.5/forecast?q=${obj.location}&appid=${api}`
    );
  } else {
    GetCurrentLocation();
    confirm("should be valid place name ");
  }
  localStorage.setItem(`${new Date().toUTCString()}`, JSON.stringify(obj));
  console.log(localStorage);
}

// show all added location on to the screen
function ShowData() {
  let perent = document.querySelector(".location-added");

  if (localStorage) {
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      let box = `<div class="added-box">
  <h2>${JSON.parse(localStorage.getItem(key)).location}</h2>
  <input type="hidden" class="key" value=${key}>
  <button class="Added-cancle">X</button>
 </div>`;
      perent.insertAdjacentHTML("afterbegin", box);
    }
  }
}
ShowData();




// function for slide show
function Slide(){
  let perent=document.querySelector(".slide-wraper")
  let btn=document.querySelector(".btnForslide")
  let show=false;//means close
  return ()=>{
    btn.addEventListener("click",()=>{
      if(show) {
        perent.style.display="none"
        show=false;
      }
      else{
        perent.style.display="block"
        show=true;
      }
    })
  }
}
Slide()()