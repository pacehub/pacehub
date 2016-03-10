function initMap() {
  var minZoom = 12,
      map,
      sgCenter = { lat: 1.360270, lng: 103.815959 },
      my_places = gon.my_places,
      place,
      address = '';;


  // Location description
  var infoWindow = new google.maps.InfoWindow();

  // Set map over center of Singapore
  map = new google.maps.Map(document.getElementById('map'), {
    center: sgCenter,
    zoom: minZoom,
    mapTypeControl: false,
    streetViewControl: false
  });

  // Add markers for all saved locations
  _.each(my_places, function (my_place) {
    my_place = new google.maps.Marker({
      position: { lat: my_place['latitude'], lng: my_place['longitude'] },
      map: map,
      title: my_place['address']
    });
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

  var input = (document.getElementById('pac-input'));

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  // Marker to be assigned
  var marker = new google.maps.Marker({
    map: map,
    anchorpoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
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

    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address );
    infoWindow.open(map, marker);
  });

  $("#add_place").click(function (e) {
    if (address) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/add_places",
        data: JSON.stringify({
          address: address
        }),
        dataType: "json",
        success: function (result) {
          console.log('successfully added')
        }
      });
    }
  });
}
