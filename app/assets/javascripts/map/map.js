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
    var address;
    infoWindow.close(); 

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

    marker.setPosition(place.geometry.location);
    map.setCenter(place.geometry.location);

    address = getAddress(place.address_components);

    // location = setLocation(address, place);
    location = {
      address: address,
      name: place.name,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }

    openInfoWindow();
  });

  // Add to my places
  $("#add_place").click(function (e) {
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

  // whenever user clicks on a point in the map
  google.maps.event.addListener(map, 'click', function (e) {
    infoWindow.close();
    moveMarker(e.latLng);
  });

  // move marker to present location
  function moveMarker(latLng) {
    marker.setPosition(latLng);
    showLocation(latLng);
  }

  // add new marker to my place
  function addMarker(place) {
    new google.maps.Marker({
      position: { lat: place['latitude'], lng: place['longitude'] },
      map: map,
      title: place['address']
    });
  };

  // display location information
  function showLocation(latLng) {
    var end_point = "https://maps.googleapis.com/maps/api/geocode/json?",
        key = "AIzaSyC62LADU--Wasiae3_LGpkvaVIUlYfJ1EU",
        latLngParams = latLng.lat() + "," + latLng.lng();
    $.get(end_point + "key=" + key + "&latlng=" + latLngParams, function (data, status) {
      if (data['status'] === "OK") {
        var address = getAddress(data['results'][0]['address_components']);
        // location = setLocation(address);
        location = {
          name: address,
          address: address,
          latitude: latLng.lat(),
          longitude: latLng.lng()
        };
        openInfoWindow();
      }
    });
  };

  // get address string from components
  function getAddress(components) {
    return _.chain(components)
      .filter(function (component) { return component['types'][0] !== 'locality' })
      .pluck('long_name')
      .value()
      .join(' ');
  }

  // Set content and open infoWindow
  function openInfoWindow() {
    infoWindow.setContent('<div><strong>' + location['name'] + '</strong><br>' + location['address'] + '</div>');
    infoWindow.open(map, marker);
  };

  // TODO
  // Set location data
  // function setLocation(address, place) {
  //   console.log('setting location')
  //   return {
  //     address: address,
  //     name: place.name,
  //     latitude: place.geometry.location.lat(),
  //     longitude: place.geometry.location.lng()
  //   }
  // };
}
