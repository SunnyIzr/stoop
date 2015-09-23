var GoogleMaps = {
  init: function(){
    $('.map-canvas').each(function(){
      GoogleMaps.loadMap($(this))
    })
    // this.loadMap($('#map-canvas'))
  },
  loadMap: function($map){
    lat = $map.data('lat')
    lng = $map.data('lng')
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
    map = new google.maps.Map($map[0],mapOptions);
    createMarker({lat: lat, lng: lng}, map, 'Building')
  }
}