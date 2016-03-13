function initMap() {
  var minZoom = 12,
      map,
      sgCenter = { lat: 1.360270, lng: 103.815959 },
      my_places = gon.my_places,
      place,
      location = {};


  // Location description
  var infoWindow = new google.maps.InfoWindow();

  // Set map over center of Singapore
  map = new google.maps.Map($('#map')[0], {
    center: sgCenter,
    zoom: minZoom,
    mapTypeControl: false,
    streetViewControl: false
  });

  // Add markers for all saved locations
  _.each(my_places, function (my_place) {
    addMarker(my_place);
  });

  // Traffic layer over map
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Limit zoom on map view
  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
  });

  var autocomplete = new google.maps.places.Autocomplete($('#pac-input')[0]);

  autocomplete.bindTo('bounds', map);

  // Marker to be assigned
  var marker = new google.maps.Marker({
    map: map,
    anchorpoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    var address = [];
    infoWindow.close(); 
    marker.setVisible(false);
    place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(16);  // 16 cos that's my jersey number
    }

    marker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    map.setCenter(place.geometry.location);
    marker.setVisible(true);

    _.each(place.address_components, function (component) {
      if (component['types'][0] !== 'locality') {
        address = address.concat(component.long_name);
      }
    });

    location = {
      address: address.join(' '),
      name: place.name,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }

    infoWindow.setContent('<div><strong>' + location['name'] + '</strong><br>' + location['address'] + '</div>');
    infoWindow.open(map, marker);
  });

  $("#add_place").click(function (e) {
    place = {};
    if (!_.isEmpty(location)) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/add_places",
        data: JSON.stringify({
          address: location['address'],
          name: location['name'],
          latitude: location['latitude'],
          longitude: location['longitude']
        }),
        dataType: "json",
        success: function (result) {
          addMarker(result);
        }
      });
    }
  });

  function addMarker(place) {
    new google.maps.Marker({
      position: { lat: place['latitude'], lng: place['longitude'] },
      map: map,
      title: place['address']
    });
  };
}
