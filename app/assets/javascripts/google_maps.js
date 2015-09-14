var GoogleMaps = {
  init: function(){
    lat = $('#map-canvas').data('lat')
    lng = $('#map-canvas').data('lng')
    this.loadMap(lat,lng)
  },
  loadMap: function(lat,lng){
    var mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.NORMAL,
      panControl: true,
      scaleControl: false,
      streetViewControl: true,
      overviewMapControl: true
    };
    // initializing map
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    createMarker({lat: lat, lng: lng}, map, 'Building')
  }
}