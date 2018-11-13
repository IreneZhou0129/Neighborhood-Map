#  NEIGHBORHOOD_MAP

# NeighborHood Map Udacity project

## Getting Started 
---------
*  Simply clone the application and run `index.html` in any browser. 

## Requirements
-------
* since the submission is in gmail with zip file. simply changed all of .txt extension to txt woul and run index.html in any browser

* Filter Locations click on right hand side MenuDropDown for a Search input for filtering features or check function `ViewModel` in `js/views.js`

*  ListView would be follow Drop `scrollable` listView of the location's name. check keyward `.scrollable-menu` in `css/styles.css` and the html keyward `<ul class="scrollable-menu list-group">`

* Map is using `google-maps-api` the animation of the marker are including hover color change and onClick for bouncing. 

* Knockout usage are included in `view_models.js` binding 

* Asynchronous API request onlied used twice, one is in `views.js` for obtaining the street and city of the location and `defer` the asynchronous google API in bottom of index.html `comment: googleMapAPI is written in js/map_utils.js` for async defer can make sure the html parser continue parsing while google map is loading.



## Tools
---
* [FourSquare](https://developer.foursquare.com/)
*  HTML and CSS 
* [knockoutJS](https://github.com/knockout/knockout/commit/09dae4db720d28cf85a1cad87f2fca95a3eed79d)
* [bootstrap](https://getbootstrap.com/)
* [JQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js)
* [GoogleMaps](https://cloud.google.com/maps-platform/)