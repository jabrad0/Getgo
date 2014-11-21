
(function (bike) {
//debugger  //alert(data);
  bike.initialize = function initialize() {  // green in HTML = tag specific parameters


    function dropMarkerAndGetNearbyPoints (results, status){ //results = geocoderRequest (lat / long via user)
      console.log(status);
      if (status === google.maps.GeocoderStatus.OK && results.length > 0){
        var result = results[0];
        var lat = result.geometry.location.lat();
        var lng = result.geometry.location.lng();
          //console.log(lat, lng);  
          
        var marker = new google.maps.Marker({
          position: result.geometry.location, 
          map: map,
          title: "Your Starting Point"
        }); 
        ///////////////////////////////////
        //Now Send the user input geocoded address (lat lng) to webapp.py
        //parses the json for you instead of leaving it as a string.
        $.getJSON("/get_nearby_businesses", {lat: lat, lng: lng}).done(function(data){ 
        //above invokes ajax call?
        console.log(data); //console.logs a json object

        //iterate over data which = webapp.py return value yelp_api_call_json" 
        //pull out lat and long and turn into pins on map '''

        //console.log("here I am!", Object.keys(data))  // == dict.keys() in python but JS is function and must enter name of array here it is 'data'
        //convert object to array and forEach itterates over, basically  
        
        Object.keys(data).forEach (function(title) {
         //console.log(title);
         //debugger         
          
          var attributes = data[title];
          //console.log(attributes.categories[0]);
          
          if (attributes.categories[0][0] === "Art Galleries") {
            var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            } else {
            var icon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
            }
          var marker_businesses = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(attributes.latitude, attributes.longitude),
            title: title,
            icon: icon
          });
          // Create marker info window'''
          var infowindow = new google.maps.InfoWindow();
          //maxWidth: 200
          google.maps.event.addListener(marker_businesses, 'click', function() {
            infowindow.setContent('<h3>' + title + '</h3><div>'+ attributes.address[0] + '<br />' + attributes.categories[0][0] + '<br />' + '<a href="' + attributes.url + '">Yelp Link</a>' + '<button onclick="myFunction()">Directions</button></div>');

            //alert("clicked " + attributes.latitude);
            //infowindow.setContent(this.info);  could also do this
            infowindow.open(map, marker_businesses);
         


          });
          
          function myFunction(){
            console.log("Directions Clicked!");
          } 

          var array_destinations = [];
          google.maps.event.addListener(marker_businesses, 'dblclick', function() {
              
            array_destinations.push(attributes.latitude);
            for (var i = 0; i < array_destinations.length; i++) {
              console.log(array_destinations);            
            }    

            // var object_destinations = {};
            // object_destinations[attributes.latitude] = attributes.longitude;
            // console.log(object_destinations);
            //infowindow.close(map, marker_businesses);
          });
          //google.maps.event.addListener(marker_businesses, 'mouseout', function() { 
          //  infowindow.close();  });
        })
        });
       ////////////////////
        $.getJSON("/get_public_art", {lat: lat, lng: lng}).done(function(data){ 
        console.log(data); 
        Object.keys(data).forEach (function(title) {
          var attributes = data[title];
          console.log(attributes.url);
          var marker_public_art = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(attributes.latitude, attributes.longitude),
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          });
          
          var infowindow_public_art = new google.maps.InfoWindow();
          google.maps.event.addListener(marker_public_art, 'click', function() {
            infowindow_public_art.setContent('<h3>' + title + '</h3><div>' + '<br />' + attributes.address + '<br />' + attributes.exterior + '<br />' + attributes.media_type + '<button onclick="myFunction()">Directions</button></div>');  
          infowindow_public_art.open(map, marker_public_art);
          });

          //google.maps.event.addListener(marker_public_art, 'mouseout', function() { 
            //infowindow_public_art.close();  });
        })
        });
////////////////
    } 
      else console.log(status);
    }
///////////////////////
  


///////////////////////////
////// Initializes map of Oakland centered on lat, long listed'''
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

  //////// Creates a new geocoder class'''
    var geocoder = new google.maps.Geocoder();
    var geocoderRequest = {
      address: bike.address,
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(myLatlng.lat() - 1, myLatlng.lng() -1), new google.maps.LatLng(myLatlng.lat() + 1, myLatlng.lng() + 1))
    };
    
  geocoder.geocode(geocoderRequest, dropMarkerAndGetNearbyPoints);
  }
})
(window.bike); // iife

// The above code was written with (some help from Jeff and Jen) using: https://developers.google.com/maps/documentation/javascript/reference#Geocoder 

google.maps.event.addDomListener(window, 'load', window.bike.initialize);