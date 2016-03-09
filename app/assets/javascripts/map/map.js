function initMap() {
  var minZoom = 12,
      marker = [],
      map,
      sgCenter = { lat: 1.360270, lng: 103.815959 },
      places = gon.places;

  map = new google.maps.Map(document.getElementById('map'), {
    center: sgCenter,
    zoom: minZoom,
    mapTypeControl: false,
    streetViewControl: false
  });

  _.each(places, function (place) {
    place = new google.maps.Marker({
      position: { lat: place['latitude'], lng: place['longitude'] },
      map: map,
      title: place['address']
    });
  });

  var trafficLayer = new google.maps.TrafficLayer();

  trafficLayer.setMap(map);

  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
  });
}
