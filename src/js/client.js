$(init);

function init () {
  initMap();

}

function getAPIData(map) {
  $.get(`${window.location.origin}/venues/api`)
  .done(data => {
    console.log(data);
    data.venues.forEach(venue => {
      console.log(venue);
      const latLng = new google.maps.LatLng(venue.lat, venue.lng);
      addMarkers(map, latLng, venue);
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

function addMarkers(map, latLng, venue) {
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP

  });
  addInfoWindowForVenue(venue, marker, map);
}

function addInfoWindowForVenue(venue, marker, map){
  google.maps.event.addListener(marker, 'click', function () {
    var contentString = `
    <div class="infowindow">
    <img class="venueImage" src="${ venue.image }">
    <h3>${ venue.title }</h3>
    <p>${ venue.location }</p>
    <p><a href="/venues/${venue._id}">Continue</a></p>
    </div>
    `;
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
    map.setCenter(marker.getPosition());
  });
}

// const infoWindow = new google.maps.InfoWindow({
//   content: 'hi'
// });

//   google.maps.event.addListener(marker, 'click', function () {
//     infoWindow.open(map, marker);
//   });
