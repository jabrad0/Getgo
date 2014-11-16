
(function (bike) {
  bike.initialize = function initialize() {  // green in HTML = tag specific parameters
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
      geocoder.geocode(geocoderRequest, function(results, status){
        console.log(status);
        if (status === google.maps.GeocoderStatus.OK && results.length > 0){
          var result = results[0];
          var lat = result.geometry.location.lat();
          var lng = result.geometry.location.lng();
            //console.log(lat, lng);  
            
          var marker = new google.maps.Marker({position: result.geometry.location, map: map,title: "Current Location"}); 
          
            //Now Send the user input geocoded address (lat lng) to webapp.py
          $.get("/get_nearby_businesses", {lat: lat, lng: lng}).done(function(data){
            debugger;
          });
        } 
        else console.log(status);
      });

//Just adding another random marker -- 
      var marker = new google.maps.Marker({
        position: {lat: 37.8044, lng: -122.2708},
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        map: map,
        title: "Downtown"
      });

      
      
    }  
})(window.bike); // iife

// The above code was written with (some help from Jeff) using: https://developers.google.com/maps/documentation/javascript/reference#Geocoder 

google.maps.event.addDomListener(window, 'load', window.bike.initialize);






