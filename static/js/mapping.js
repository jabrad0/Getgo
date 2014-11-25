////// From Google - t Initializes map of Oakland centered on lat, long listed'''

$(document).ready(function() {
  var mapOptions = {
    zoom: 14,
    center: myLatlng
    };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
});

var myLatlng = new google.maps.LatLng(37.8044, -122.2708);
var array_locations = [];

var infowindows = {};

(function (bike) {
//debugger  //alert(data);
  bike.initialize = function initialize() {  // green in HTML = tag specific parameters
  var infowindow = new google.maps.InfoWindow();
  var markers = [];

  var handleBusinessResults = function(data) {
          //above invokes ajax call?
           //console.logs a json object

          //iterate over data which = webapp.py return value yelp_api_call_json" 
          //pull out lat and long and turn into pins on map '''

          //console.log("here I am!", Object.keys(data))  // == dict.keys() in python but JS is function and must enter name of array here it is 'data'
          //convert object to array and forEach itterates over, basically  
    var i = 0;
    Object.keys(data).forEach(function(title) {
      var attributes = data[title];
      if (attributes.categories[0][0] === "Art Galleries") {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      } 
      else {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
      }
      var marker_businesses = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(attributes.latitude, attributes.longitude),
        title: title,
        icon: icon
      });
      infowindows[title] = infowindow;
      google.maps.event.addListener(marker_businesses, 'click', function() {
        var infowindow_content = '<h3>' + title + '</h3><div class="place">'+ attributes.address[0] + '<br />' + attributes.categories[0][0] + '<br />' + '<a href="' + attributes.url + '">Yelp Link</a>' + '<button id = "' + i + '" class="get-directions-button" data-title="'+title +'" data-lat1="'+lat_starting +'" data-long1="' +lat_starting +'" data-lat2="' +attributes.latitude+'" data-long2="' +attributes.longitude+'">Directions</button></div>';

        infowindow.setContent(infowindow_content);

         // $("body").append($("<h3>").attr("id", "title").val(title));
        // $("body").append($("<button>").click(function(){alert("heya!");}));
          // $("button")


        //alert("clicked " + attributes.latitude);
        //infowindow.setContent(this.info);  could also do this
        infowindow.open(map, marker_businesses);
      }); //end of line 118
      markers.push(marker_businesses);
    }); //end of the for loop 
  };

  function renderDirections (pos1, pos2){
    var directions_service = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

    var directionsRequest = {
        origin: new google.maps.LatLng(pos1[0], pos1[1]),
        destination: new google.maps.LatLng(pos2[0], pos2[1]),
        travelMode: google.maps.TravelMode.BICYCLING,
    }; 

    directions_service.route(directionsRequest, function(result, status){
      if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(result);
      }
    });
    getNearbyPoints(pos2[0], pos2[1]);
  };

  var handleArtResults = function(data, lat_starting, lng_starting){
    console.log(data);
    var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(lat_starting - 0.01, lng_starting - 0.01), new google.maps.LatLng(lat_starting + 0.01, lng_starting + 0.01)); 
    Object.keys(data)
    .filter(function(title) {
      return bounds.contains(new google.maps.LatLng(data[title].latitude, data[title].longitude));
    })
    .forEach(function(title){
      var attributes = data[title];
      console.log(attributes.url);
      var marker_public_art = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(attributes.latitude, attributes.longitude),
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      });
      
      google.maps.event.addListener(marker_public_art, 'click', function() {
        var header = $('<h3></h3>');
        header.text(title);
        var content = $('<div></div>');
        var address = $('<div></div>');
        address.text(attributes.address);
        var exterior = $('<div></div>');
        exterior.text(attributes.exterior);
        var directions = $('<button class="info-window-direction-button" />');
        directions.text('Directions');
        content.append(header);
        content.append(address);
        content.append(exterior);
        content.append(directions);
        infowindow.setContent(content.html()); 
        infowindow.open(map, marker_public_art);
        $('.info-window-direction-button').click(function() {
          renderDirections([lat_starting, lng_starting], [attributes.latitude, attributes.longitude])
        });
      });
      markers.push(marker_public_art);

    //google.maps.event.addListener(marker_public_art, 'mouseout', function() { 
      //infowindow_public_art.close();  });
    });
  };

    function getNearbyPoints(lat, lon) {
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon), 
        map: map,
        title: "Your Starting Point"
      });
      markers.push(marker);
      //Now Send the user input geocoded address (lat lng) to webapp.py
      //parses the json for you instead of leaving it as a string.
      $.getJSON("/get_nearby_businesses", {lat: lat, lng: lon}).done(handleBusinessResults);
      $.getJSON("/get_public_art", {lat: lat, lng: lon}).done(function(data) {
        handleArtResults(data, lat, lon);
      });
    }

    function dropMarkerAndGetNearbyPoints (results, status){ //results = geocoderRequest (lat / long via user)
      console.log(status);
      //check is starting point is valid address that google can geocode
      //set marker at lat long "Starting Point"
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        var result = results[0];
        var lat_starting = result.geometry.location.lat();
        
        var lng_starting = result.geometry.location.lng();
          //console.log(lat, lng);  
        getNearbyPoints(lat_starting, lng_starting);
     } //end if on 64
      else{
        console.log(status);
      }
///////////////////////
   // All above code and the last line: google.maps.event.addDomListener(window, 'load', initialize);  --> comes from: https://developers.google.com/maps/documentation/javascript/examples/map-simple
  //////// Creates a new geocoder class'''
    
    }//end bike initialize
    var geocoder = new google.maps.Geocoder();
    var geocoderRequest = {
      address: bike.address,
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(myLatlng.lat() - 2, myLatlng.lng() -2), new google.maps.LatLng(myLatlng.lat() + 2, myLatlng.lng() + 2))
    };

    geocoder.geocode(geocoderRequest, dropMarkerAndGetNearbyPoints);
  };
})(window.bike); // iife
// The above code was written with (some help from Jeff and Jen) using: https://developers.google.com/maps/documentation/javascript/reference#Geocoder
// google.maps.event.addDomListener(window, 'load', function(){ console.log("slkjdflskjfslkdjfsldkfjsldkfjsldfkjslkfj")});
google.maps.event.addDomListener(window, 'load', window.bike.initialize);
