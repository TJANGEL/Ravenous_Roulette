# Food-Roulette

Group Project #1
background image found at http://www.freepptbackgrounds.net/wp-content/uploads/2013/02/Mc-Donalds-Powerpoint-Backgrounds.jpg

Utilized html, css, java script, jquery, ajax, google api, yelp api
    As a replacement for bootstrap and use of a new language, Foundation was used to stylize the app


Page initializes with a modal requesting users location
With the user's location, 10 restaurants are randomly pull from yelp's API and populate the wheel
When the user clicks the spin button the wheel rotates until the arrow lands on a specific restaurant
The chosen restaurant name populates a div below the wheel and simultaneously takes the latitude and longitude of the restaurant and drops a pin on the map div
    A link to the restaurants yelp page populates the div with the chosen restaurant
The user can re spin the wheel to pick another restaurant
    Will empty the restaurant and map div and fill it with the newly picked restaurant
