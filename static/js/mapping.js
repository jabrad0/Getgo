
var modal_places_visited = [];

function log_places_visited (title, num_miles_between ){
  modal_places_visited.push({title: title, dist: num_miles_between});
  //console.log(modal_places_visited[0].title);
  //console.log(modal_places_visited[0].dist);
}
//'<span> "'+ sjashs +'"</span>' +


////// From Google - Initializes map of Oakland centered on lat, long listed'''
$(document).ready(function(){
  var mapOptions = {
    zoom: 14,
    center: myLatlng
    };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    
  $('#button-overlay').click(function(e){
    e.preventDefault();
    console.log("Hi");
    console.log(modal_places_visited);
    var total_dist = 0;
    for (i=0; i<modal_places_visited.length; i++) {   
      //total_dist = modal_places_visited[i].dist;
      console.log("here?")
      $("#places_visited").append(modal_places_visited[i].title + "\t" + modal_places_visited[i].dist + '<br>')
    };
  //$("#places_visited").append(total_dist)      
  })

  $('#button-overlay').click(function(e){
    e.preventDefault();
    $('#modal_places_visited').removeClass('hidden').click(function(){
      $("#places_visited").empty()
      $(this).addClass('hidden') //addClass is jquery method must be called on jquery object so $() converts 'this' to a jquery object 
    });

  });
});

var myLatlng = new google.maps.LatLng(37.8044, -122.2708);

(function (bike){
//debugger  //alert(data);
  bike.initialize = function initialize(){  // green in HTML = tag specific parameters
    var infowindow = new google.maps.InfoWindow({
      //maxWidth: 50000
    });
    var markers = [];
    var array_places = [];
    var miles_between = [];
    var miles_total = 0;
    

    var handleBusinessResults = function(data, lat_starting, lng_starting){
      Object.keys(data)
      .forEach(function(title) {
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
     
        google.maps.event.addListener(marker_businesses, 'click', function() {
          var header = $('<h3></h3>');
          header.text(title);
          var content = $('<div></div>');
          var address = $('<div></div>');
          address.text(attributes.address[0]);
          var categories = $('<div></div>');
          categories.text(attributes.categories[0][0]);
          var url = $('<div><a href="' + attributes.url + '">Yelp Link</a></div>');
          var directions = $('<button class="info-window-direction-button" />');
          directions.text('Directions');
          content.append(header);
          content.append(address);
          content.append(categories);
          content.append(url);
          content.append(directions);
          
          infowindow.setContent(content.html()); 
          infowindow.open(map, marker_businesses);
          $('.info-window-direction-button').click(function() {
            renderDirections(title, [lat_starting, lng_starting], [attributes.latitude, attributes.longitude])
            //$('#places_visited').append(title +'<br>');
          });
        }); 
        markers.push(marker_businesses);
      }); 
    };

    var handleArtResults = function(data, lat_starting, lng_starting){
      var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(lat_starting - 0.01, lng_starting - 0.01), new google.maps.LatLng(lat_starting + 0.01, lng_starting + 0.01)); 
      Object.keys(data)
      .filter(function(title){
        return bounds.contains(new google.maps.LatLng(data[title].latitude, data[title].longitude));
      })
      .forEach(function(title){
        var attributes = data[title];
        //console.log(attributes.url);
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
          var media_detail = $('<div></div>');
          media_detail.text(attributes.media_detail);
          var exterior = $('<div></div>');
          exterior.text(attributes.exterior);
          var directions = $('<button class="info-window-direction-button" />');
          directions.text('Directions');
          content.append(header);
          content.append(address);
          content.append(media_detail);
          content.append(exterior);
          content.append(directions);
          infowindow.setContent(content.html()); 
          

          infowindow.open(map, marker_public_art);
          $('.info-window-direction-button').click(function() {
            renderDirections(title, [lat_starting, lng_starting], [attributes.latitude, attributes.longitude])
            array_places.push(title);
            //$('#places_visited').append(title);
          });
        });
        markers.push(marker_public_art);
      });
    };

    function renderDirections (title, pos1, pos2){
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

          miles_between = (result.routes[0].legs[0].distance.text);
          //console.log(miles_between);
          num_miles_between = parseFloat(miles_between, 10);
          //miles_total += num_miles_between;
          num_miles_between_rounded = num_miles_between.toFixed(1);
          log_places_visited(title, num_miles_between_rounded)
          //$('#places_visited').append(miles_between + '<br>') 
        }
      });
      getNearbyPoints(pos2[0], pos2[1]);
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
      $.getJSON("/get_nearby_businesses", {lat: lat, lng: lon}).done(function(data){
        handleBusinessResults(data, lat, lon);
      });
      
      $.getJSON("/get_public_art", {lat: lat, lng: lon}).done(function(data) { //ajax request
        handleArtResults(data, lat, lon);
      });
    }

    function dropMarkerAndGetNearbyPoints (results, status){ //results = geocoderRequest (lat / long via user)
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        var result = results[0];
        var lat_starting = result.geometry.location.lat();
        
        var lng_starting = result.geometry.location.lng();
        getNearbyPoints(lat_starting, lng_starting);
      } 
      else{
        console.log(status);
      }
    }  
    var geocoder = new google.maps.Geocoder();
    var geocoderRequest = {
      address: bike.address,
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(myLatlng.lat() - 2, myLatlng.lng() -2), new google.maps.LatLng(myLatlng.lat() + 2, myLatlng.lng() + 2))
    };
    geocoder.geocode(geocoderRequest, dropMarkerAndGetNearbyPoints);
  };
})
(window.bike); // iife
google.maps.event.addDomListener(window, 'load', window.bike.initialize);
