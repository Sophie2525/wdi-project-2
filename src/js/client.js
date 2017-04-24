// console.log('hello world');

$(init);

function init() {
  initMap();
}

function getAPIData(map) {
  $.get(`${window.location.origin}/venues/api`)
  .done(data => {
    // console.log(data);
    data.venues.forEach(venue => {
      console.log(venue);
      const latLng = new google.maps.LatLng(venue.lat, venue.lng);
      addMarkers(map, latLng);
    });
  });
}

function initMap() {
  const manitoba = {lat: 53.760861, lng: -98.813876};
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: manitoba
  });
  getAPIData(map);
}


function addMarkers(map, latLng) {
  const marker = new google.maps.Marker({
    position: latLng,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 4
    },
    map: map
  });
}


// create function for venue markers



// <%= venue.lat %> <%= venue.lang %>
// const locations =

// const latLng = new google.maps.LatLng(venue.lat, venue.lang);
//
// const marker = new google.maps.Marker({
//   position: latLng,
//   icon: {
//     path: google.maps.SymbolPath.CIRCLE,
//     scale: 4
//   },
//   map: map
// });
