////// From Google - t Initializes map of Oakland centered on lat, long listed'''
$(document).ready(function() {
var mapOptions = {
    zoom: 14,
    center: myLatlng
    };
map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
})

var myLatlng = new google.maps.LatLng(37.8044, -122.2708);
var array_locations = [];

var infowindows = {};
/////////////////////////////////////
function myFunction(title, lat1, _long1, lat2, _long2){
  //CREATE an ARRIVED BUTTON HERE, but should be in INFO window inside dropmarker...
    
    $(infowindows[title]).find('div.place').append($("<button>").click(function(){alert("heya!");}));
    
    array_locations.push([lat1, _long1], [lat2, _long2]);
    console.log(array_locations);
    get_directions([lat1, _long1], [lat2, _long2]);
} 
/////////////////////////////////////
function get_directions (pos1, pos2){
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
};
////////////////////////////////////
(function (bike) {
//debugger  //alert(data);
  bike.initialize = function initialize() {  // green in HTML = tag specific parameters


    function dropMarkerAndGetNearbyPoints (results, status){ //results = geocoderRequest (lat / long via user)
      console.log(status);
      //check is starting point is valid address that google can geocode
      //set marker at lat long "Starting Point"
      if (status === google.maps.GeocoderStatus.OK && results.length > 0){
        var result = results[0];
        var lat_starting = result.geometry.location.lat();
        
        var lng_starting = result.geometry.location.lng();
          //console.log(lat, lng);  
          
        var marker = new google.maps.Marker({
          position: result.geometry.location, 
          map: map,
          title: "Your Starting Point"
        }); 
        ///////////////////////////////////
        //Now Send the user input geocoded address (lat lng) to webapp.py
        //parses the json for you instead of leaving it as a string.
        $.getJSON("/get_nearby_businesses", {lat: lat_starting, lng: lng_starting}).done(function(data){ 
        //above invokes ajax call?
         //console.logs a json object

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
          
          infowindows[title] = infowindow;

          //maxWidth: 200
          google.maps.event.addListener(marker_businesses, 'click', function() {
            
            var infowindow_content = '<h3>' + title + '</h3><div class="place">'+ attributes.address[0] + '<br />' + attributes.categories[0][0] + '<br />' + '<a href="' + attributes.url + '">Yelp Link</a>' + '<button onclick="myFunction(\'' + title + '\', ' +lat_starting + ', ' + lng_starting + ',' + attributes.latitude + ', ' + attributes.longitude
              + ')">Directions</button></div>';

// // passing a DOM element instead of a string to infowindow.setContent
//           var html = 
//             '<h3>' + title + '</h3><button>Directions</button>';

//           $(html).find('button').click(function () {
//             myFunction(infowindow, lat1, long1, lat2, long2)
//           });

            console.log(infowindow_content);
            infowindow.setContent(infowindow_content);

            // $("body").append($("<h3>").attr("id", "title").val(title));
            // $("body").append($("<button>").click(function(){alert("heya!");}));
              // $("button")


            //alert("clicked " + attributes.latitude);
            //infowindow.setContent(this.info);  could also do this
            infowindow.open(map, marker_businesses);

          });
        
          // google.maps.event.addListener(marker_businesses, 'dblclick', function() {
              
          //   array_destinations.push(attributes.latitude);
          //   for (var i = 0; i < array_destinations.length; i++) {
          //     console.log(array_destinations);            
          //   }    
            // var object_destinations = {};
            // object_destinations[attributes.latitude] = attributes.longitude;
            // console.log(object_destinations);
            //infowindow.close(map, marker_businesses);
          // });
          //google.maps.event.addListener(marker_businesses, 'mouseout', function() { 
          //  infowindow.close();  });
        });
        });
       ////////////////////
        $.getJSON("/get_public_art", {lat: lat_starting, lng: lng_starting}).done(function(data){ 
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
            infowindow_public_art.setContent('<h3>' + title + '</h3><div>' + '<br />' + attributes.address + '<br />' + attributes.exterior + '<br />' + attributes.media_type + '<button onclick="myFunction(' + lat_starting + ', ' + lng_starting + ',' + attributes.latitude + ', ' + attributes.longitude
              + ')">Directions</button></div>');  
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

   // All above code and the last line: google.maps.event.addDomListener(window, 'load', initialize);  --> comes from: https://developers.google.com/maps/documentation/javascript/examples/map-simple

  //////// Creates a new geocoder class'''
    var geocoder = new google.maps.Geocoder();
    var geocoderRequest = {
      address: bike.address,
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(myLatlng.lat() - 2, myLatlng.lng() -2), new google.maps.LatLng(myLatlng.lat() + 2, myLatlng.lng() + 2))
    };

  geocoder.geocode(geocoderRequest, dropMarkerAndGetNearbyPoints);

  }
})
(window.bike); // iife

// The above code was written with (some help from Jeff and Jen) using: https://developers.google.com/maps/documentation/javascript/reference#Geocoder 

google.maps.event.addDomListener(window, 'load', window.bike.initialize);