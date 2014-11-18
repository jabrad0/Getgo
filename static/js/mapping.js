
(function (bike) {

  bike.initialize = function initialize() {  // green in HTML = tag specific parameters


    function dropMarkerAndGetNearbyPoints (results, status){
      console.log(status);
      if (status === google.maps.GeocoderStatus.OK && results.length > 0){
        var result = results[0];
        var lat = result.geometry.location.lat();
        var lng = result.geometry.location.lng();
          //console.log(lat, lng);  
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({position: result.geometry.location, map: map,title: "Starting Point"}); 
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent('This is your starting location!');
		infoWindow.open(map, marker);
	});
        
          //Now Send the user input geocoded address (lat lng) to webapp.py
        
        $.getJSON("/get_nearby_businesses", {lat: lat, lng: lng}).done(function(data){
        
        console.log(data); //debugger;
        	Object.keys(data).forEach(function(title) {
			var location = data[title];
			var marker = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(location.latitude, location.longitude)
			});
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent('<h3>' + title + '</h3><div>' + location.address.join('<br />') + '<br />' + [location.city, location.state, location.zip_code].join(' ') + '</div>');
				infoWindow.open(map, marker);
			});
		});



        //alert(data);
        });
      } 
      else console.log(status);
    }
  //this code initializes my map of Oakland
    var myLatlng = new google.maps.LatLng(37.8044, -122.2708);
    var mapOptions = {
      zoom: 14,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
   // All above code and the last line: google.maps.event.addDomListener(window, 'load', initialize);  --> comes from: https://developers.google.com/maps/documentation/javascript/examples/map-simple

  //this code creates new geocoder class
    var geocoder = new google.maps.Geocoder();
    var geocoderRequest = {
      address: bike.address,
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(myLatlng.lat() - 1, myLatlng.lng() -1), new google.maps.LatLng(myLatlng.lat() + 1, myLatlng.lng() + 1))
    };
    
  geocoder.geocode(geocoderRequest, dropMarkerAndGetNearbyPoints);

//Just adding another random marker -- 
    var marker = new google.maps.Marker({
      position: {lat: 37.8044, lng: -122.2708},
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      map: map,
      title: "Downtown"
    });
  }  
})

(window.bike); // iife

// The above code was written with (some help from Jeff and Jen) using: https://developers.google.com/maps/documentation/javascript/reference#Geocoder 

google.maps.event.addDomListener(window, 'load', window.bike.initialize);






