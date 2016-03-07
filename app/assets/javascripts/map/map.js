var minZoom = 12, map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.360270, lng: 103.815959},
    zoom: minZoom,
    mapTypeControl: false,
    streetViewControl: false
  });

  var trafficLayer = new google.maps.TrafficLayer();

  trafficLayer.setMap(map);

  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
  });
}
