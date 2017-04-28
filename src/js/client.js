$(init);
var infowindow;

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
  const winnipeg = {lat: 49.895136, lng: -97.138374};
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: winnipeg,
    styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#713c8c"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
  });
  getAPIData(map);
}

function addMarkers(map, latLng, venue) {
  var icon = {
    url: 'http://i.imgur.com/QIH1qIG.png',
    scaledSize: new google.maps.Size(42, 30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };

  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    animation: google.maps.Animation.BOUNCE,
    icon
  });
  addInfoWindowForVenue(venue, marker, map);
}

function addInfoWindowForVenue(venue, marker, map){
  google.maps.event.addListener(marker, 'click', function () {
    if(typeof infowindow !== 'undefined'){
      infowindow.close();
    }
    var contentString = `
    <div class="infowindow">
    <h4>${ venue.title }<h4>
    <p>${ venue.location }</p>
    <p><a href="/venues/${venue._id}">Continue</a></p>
    </div>
    `;
    infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
    map.setCenter(marker.getPosition());
  });
}

// function panTo(venue, marker, map, latLng){
//   google.maps.event.addListener(marker, 'click', function() {
//     map.panTo(latLng);
//   });
// }
