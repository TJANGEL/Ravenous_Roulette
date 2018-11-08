# RestaurantRoulette

Group Project #1
background image found at http://www.freepptbackgrounds.net/wp-content/uploads/2013/02/Mc-Donalds-Powerpoint-Backgrounds.jpg

Utilized html, css, java script, jquery, ajax, google api, yelp api, firebase
    As a replacement for bootstrap and use of a new language, Foundation was used to stylize the app


Page initializes with a modal requesting users location
With the user's location, 10 restaurants are randomly pull from yelp's API and populate the wheel as well as google map
When the user clicks the spin button the wheel rotates until the arrow lands on a specific restaurant
The chosen restaurant name populates a div below the wheel and the map
    (can we also have more information on the restaurant populate that area simultaneously?)
Restaurant choice and details are saved to firebase database
    (Still needs to be implimented)
Multiple rolls can be done by reclicking the spin button
    (eventually would want multiple clicks to be ineffective while the wheel is spinning)
