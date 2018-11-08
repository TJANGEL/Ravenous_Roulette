var name;
var zip;
var restaurantOptions = [];
var restaurantCoord = [];
latitude1 = [];
longitude1 = [];

//setting global variables to change later
var pos = "";
var lat1 = 0;
var lon1 = 0;
var map, infoWindow;
// // function to create map
function initMap() {
    console.log(location1)
    // actual map being created
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 10,
            center: {
                lat: -34.397,
                lng: 150.644
            },
        });
    // creating markers for map
    var marker1 = new google.maps.Marker({
        position: location1,
        map: map
    })
    // setting position of map
    map.setCenter(pos);
}
var location1 = null;
function YelpCall() {
    //event to ask for user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //getting location for google maps
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // getting location for yelp
            lat1 = position.coords.latitude;
            lon1 = position.coords.longitude;
            console.log(lat1, lon1)
            
            //yelp api
            const apiKey =
                'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
            const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=' +
                lat1 + '&longitude=' + lon1 + '&limit=10';
            const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
            $.ajax({
                async: false,
                url: proxyUrl + yelpUrl,
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + apiKey
                }
            }).then(function (response) {
                // latitude1 = response.businesses[3].coordinates.latitude;
                // longitude1 = response.businesses[3].coordinates.longitude;
                // location1 = {
                //     lat: latitude1,
                //     lng: longitude1,
                
                // }
                console.log(response);

                for(let i = 0; i<response.businesses.length; i++) {

                restaurantOptions.push(response.businesses[i].name);
                restaurantCoord.push(response.businesses[i].coordinates);
                console.log(response)
                console.log(restaurantCoord)
                console.log(restaurantOptions);
                drawRouletteWheel()

                // placing pin on google maps
                console.log(response)
                latitude1 = response.businesses[i].coordinates.latitude;
                longitude1 = response.businesses[i].coordinates.longitude;
                location1 = {
                    lat: latitude1,
                    lng: longitude1
                }
                // //appending script tag to html as to call maps api
                // var googleTag = $(
                //     '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uq660sOqIWpWFdN6tGwKUYR07jmx-Ww&callback=initMap">'
                // )
                // $("body").append(googleTag);
                
            }
               //appending script tag to html as to call maps api
                var googleTag = $(
                    '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uq660sOqIWpWFdN6tGwKUYR07jmx-Ww&callback=initMap">'
                )
                $("body").append(googleTag);
        })
            .catch(error => {
                console.error(error);
            });
        //event handlers for location error
    }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    handleLocationError(false, infoWindow, map.getCenter());
}
console.log(lat1, lon1)
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
console.log(lat1, lon1)
//calls yelp api to start function
YelpCall();
// initMap();


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYq6U-Ef_3VqToxXHZPLY8xnQMff_2HIk",
    authDomain: "ravenous-roulette.firebaseapp.com",
    databaseURL: "https://ravenous-roulette.firebaseio.com",
    projectId: "ravenous-roulette",
    storageBucket: "ravenous-roulette.appspot.com",
    messagingSenderId: "172735416002"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    zip = $("#zip-input").val().trim();

    // Code for the push
    dataRef.ref().push({

        name: name,
        zip: zip,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

dataRef.ref().on("child_added", function (childSnapshot) {

    // log variables
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().zip);
    console.log(childSnapshot.val().cuisine);

    $("#full-user-list").append("<div class='well'><span class='user-name'> " +
        childSnapshot.val().name +
        " </span><span class='user-zip'> " + childSnapshot.val().zip +
        " </span></div>");

    // Clear forms
    $("#name-input").val("");
    $("#zip-input").val("");

    // incorrect user input formatting
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#zip-display").text(snapshot.val().zip);
});