function initMap() {
  var minZoom = 12,
      sgCenter = { lat: 1.360270, lng: 103.815959 },
      myPlaces = gon.my_places,
      LOCATION = {},
      restrictions = {
        componentRestrictions: { country: "sg" }
      },
      origin = {},
      destination = {};

  var infoWindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder();

  // Set map over center of Singapore
  var map = new google.maps.Map($('#map')[0], {
    center: sgCenter,
    zoom: minZoom,
    mapTypeControl: false,
    streetViewControl: false
  });

  // Traffic layer over map
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Marker to be assigned
  var marker = new google.maps.Marker({
    map: map,
    anchorpoint: new google.maps.Point(0, -29)
  });

  var image = {
    url: "https://cdn3.iconfinder.com/data/icons/map/500/communication-512.png",
    scaledSize: new google.maps.Size(30, 30)
  }

  // Add markers for all saved locations
  _.each(myPlaces, function (myPlace) {
    addMyMarker(myPlace);
  });

  // Limit zoom on map view
  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
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
          data: JSON.stringify(LOCATION),
          dataType: "json",
          success: function (result) {
            addMyMarker(result);
          }
        });
      }
    });
    return btn[0];
  };

  $('#origin').click(function () {
    origin = {latitude: LOCATION['latitude'], longitude: LOCATION['longitude']}
    console.log(origin)
  });

  $('#destination').click(function () {
    destination = {latitude: LOCATION['latitude'], longitude: LOCATION['longitude']}
    console.log(destination)
  });

  $('#start-trip').click(function () {
    if (_.isEmpty(origin)) {
      alert("Please specify starting point");
    } else if (_.isEmpty(destination)) {
      alert("Please specify ending point");
    } else {
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/get_directions",
        data: JSON.stringify({origin, destination}),
        dataType: "json",
        success: function (result) {
          var duration = (Date.parse(result['end_time']) - Date.parse(result['start_time']))/60000
          console.log('it will take you ' + duration.toFixed(0) + ' minutes')
        }
      });
    }
  });

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addPlaceButton());

  var autocomplete = new google.maps.places.Autocomplete($('#pac-input')[0], restrictions);
  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    infoWindow.close();

    var _place = autocomplete.getPlace();

    if (!_place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (_place.geometry.viewport) {
      map.fitBounds(_place.geometry.viewport);
    } else {
      map.setCenter(_place.geometry.location);
      map.setZoom(16);  // 16 cos jersey number
    }

    marker.setPosition(_place.geometry.location);
    map.setCenter(_place.geometry.location);

    setLocationData(_place.name, _place);
    openInfoWindow(marker);
  });

  google.maps.event.addListener(map, 'click', function (e) {
    infoWindow.close();
    setMarker(e.latLng);
    showLocation(e.latLng);
  });

  function setMarker(latLng) {
    marker.setPosition(latLng);
  }

  function addMyMarker(place) {
    var _marker = new google.maps.Marker({
      position: { lat: place['latitude'] * 1, lng: place['longitude'] * 1 },
      map: map,
      title: place['name'],
      icon: image
    });
    _marker.addListener('click', function () {
      geocodeLocation(_marker.getPosition(), function (result) {
        if (result) {
          setLocationData(_marker.getTitle(), result)
          openInfoWindow(_marker);
        }
      });
    });
  };

  function showLocation(latLng) {
    geocodeLocation(latLng, function (result) {
      if (result) {
        setLocationData(result['formatted_address'], result)
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

  function formAddress(components) {
    return _.chain(components)
            .filter(function (component) { return component['types'][0] !== 'locality' })
            .pluck('long_name')
            .value()
            .join(' ');
  }

  function openInfoWindow(marker) {
    var _marker = marker,
        content = '<div><strong>' + LOCATION['name'] + '</strong><br>' + LOCATION['address'] + '</div>';
    infoWindow.setContent(content);
    infoWindow.open(map, _marker);
  };

  function setLocationData(name, place) {
    LOCATION = {
      name: name,
      address: formAddress(place['address_components']),
      latitude: place.geometry.location.lat().toFixed(7),
      longitude: place.geometry.location.lng().toFixed(7)
    }
  };
}
