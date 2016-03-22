function initMap() {
  var minZoom = 12,
      map,
      sgCenter = { lat: 1.360270, lng: 103.815959 },
      my_places = gon.my_places,
      place,
      LOCATION = {},
      restrictions = {
        componentRestrictions: {country: "sg"}
      };


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
    addMyMarker(my_place);
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

  var autocomplete = new google.maps.places.Autocomplete($('#pac-input')[0], restrictions);
  var geocoder = new google.maps.Geocoder();

  autocomplete.bindTo('bounds', map);

  // Marker to be assigned
  var marker = new google.maps.Marker({
    map: map,
    anchorpoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
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

    setLocation(place.name, place);

    openInfoWindow(marker);
  });

  function addPlaceButton () {
    var btn = $('<div class="col-sm-2 add-place-btn"><form class="btn btn-warning">Add this place</form></div>');
    btn.bind('click', function (e) {
      if (!_.isEmpty(LOCATION)) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          url: "/api/add_places",
          data: JSON.stringify({
            address: LOCATION['address'],
            name: LOCATION['name'],
            latitude: LOCATION['latitude'],
            longitude: LOCATION['longitude']
          }),
          dataType: "json",
          success: function (result) {
            addMyMarker(result);
          }
        });
      }
    });
    return btn[0];
  };

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addPlaceButton());

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
  function addMyMarker(place) {
    var _marker = new google.maps.Marker({
      position: { lat: place['latitude'] * 1, lng: place['longitude'] * 1 },
      map: map,
      title: place['name']
    });
    _marker.addListener('click', function () {
      geocodeLocation(_marker.getPosition(), function (result) {
        if (result) {
          setLocation(_marker.getTitle(), result)
          openInfoWindow(_marker);
        }
      });
    });
  };

  // display location information
  function showLocation(latLng) {
    geocodeLocation(latLng, function (result) {
      if (result) {
        setLocation(result['formatted_address'], result)
        openInfoWindow(marker);
      }
    });
  };

  function geocodeLocation(latLng, callback) {
    geocoder.geocode({ location: latLng }, function (results, status) {
      if (status === "OK") {
        callback(results[0]);
      } else {
        alert("Unable to get location detail: " + status + "\nPlease try again");
        callback();
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
  function openInfoWindow(marker) {
    var _marker = marker,
        content = '<div><strong>' + LOCATION['name'] + '</strong><br>' + LOCATION['address'] + '</div>',
        originButton = '<div class="col-sm-6" id="btn-origin"><form class="btn btn-primary">Start</form></div>',
        destinationButton = '<div class="col-sm-6" id="btn-destination"><form class="btn btn-success">End</form></div>';
    infoWindow.setContent(content + originButton + destinationButton);
    infoWindow.open(map, _marker);
  };

  // Set location data
  function setLocation(name, place) {
    LOCATION = {
      name: name,
      address: getAddress(place['address_components']),
      latitude: place.geometry.location.lat().toFixed(7),
      longitude: place.geometry.location.lng().toFixed(7)
    }
  };
}
