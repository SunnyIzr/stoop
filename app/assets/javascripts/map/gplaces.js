var GooglePlaces = {
  init: function(lat,lng){
    var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 16,
      scrollwheel: false
    };
    window.searchMap = new google.maps.Map(document.getElementById('search-map-canvas'),
      mapOptions);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', searchMap);

    searchMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: searchMap
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(searchMap, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      setTimeout(function(){
        Post.persistCheckIn()
      },1500 );
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        searchMap.fitBounds(place.geometry.viewport);
      } else {
        searchMap.setCenter(place.geometry.location);
        searchMap.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace(/** @type {!google.maps.Place} */ ({
        placeId: place.place_id,
        location: place.geometry.location
      }));
      marker.setVisible(true);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '</div>');
      infowindow.open(map, marker);
    });
  }
}

// // Run the initialize function when the window has finished loading.
// google.maps.event.addDomListener(window, 'load', initialize);