var map , infoWindow;

var bounds; // zoom into the locations on the map instead of visualizing 
var error = false; // ensure the Error only PopOff once

function initMap(){
    // initializes the map for google-map API
    var initialized_location = {
        lat: 45.422357,
        lng: -75.684417
    };
    
    // Ref https://developers.google.com/maps/documentation/javascript/styling
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        // centering at the initlaized_location
        center: initialized_location, 
        mapTypeControl: false,
    });
    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
}   

function MapError(er){ 
    if(!error)
        error=true;
        alert("Google maps error\n please contact administrator Xiaoxinzhou0gmail.com")
}

function bindEventsOnIcon(viewModel){ 
    /** 
     * bindEventOnIcon
     *  Apply event listener to the infoIcon
     */
    // Create an onclick even to open an infowindow at each marker
    viewModel.mapIcon.addListener('click', function() {
        InfoWindowPopUp(viewModel, infoWindow);
        toggleBounce(viewModel.mapIcon);
        map.panTo(viewModel.position);
    });
    
    // shorter code
    var defaultIcon = viewModel.unlabelIcon;
    var highlightedIcon = viewModel.labeledIcon;

    // color change when mouse over and mouse on
    viewModel.mapIcon.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });
    // on leave remove the highlight color
    viewModel.mapIcon.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });  
}

// windows popUp
function InfoWindowPopUp(viewModel , infoWindow){
    /***
     * InfoWindowPopUp 
     * PopUp a popOver box for displaying information regard the given location
     * @param viewModel: view_model that contain a location information and icons
     * @param infoWindow: PopOver InfoWindow for displaying details
     */
    if( infoWindow.mapIcon != viewModel.mapIcon){ 
        // clear the content and placed new icons
        infoWindow.setContent('')
        infoWindow.mapIcon = viewModel.mapIcon;
        infoWindow.addListener( 
            'closeclick',()=>{ infoWindow.mapIcon = null}
        )
        var popUpInfo = viewModel.popUpInfo
        var windowContent ='<div class="col">' 
        windowContent += '<h4>' + viewModel.title + '</h4>';
        windowContent += '<p>' + popUpInfo.street  + '<br> <br>' 
        windowContent += popUpInfo.phone + '</p> </div>'
        windowContent +=  '</div> '

        // binding ko.observable to bootstrapPopOver
        // Ref https://stackoverflow.com/questions/40466367/bootstrap-popover-for-a-knockout-data-bind-list
        infoWindow.setContent(windowContent)
        infoWindow.open(map,viewModel.mapIcon)
    }
}

// make the marker bounce
function toggleBounce(marker) {
    /**
     * toggleBounce
     * @param marker object of animation details 
     *     toggle bouncing of the marker object 
     * Ref: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
     */
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
          marker.setAnimation(null);
      }, 1400);
    }
  }


function initMarker(viewModel , defaultColor='FFFF24' , hightlightedColor='48db4d'){ 
    // getting the images of icons
    viewModel.unlabelIcon = getIconImage(defaultColor)
    viewModel.labeledIcon = getIconImage(hightlightedColor)
    
    // inintializes the marker for the map
    viewModel.mapIcon =  new google.maps.Marker ( { 
        position: viewModel.position,
        title: viewModel.title,
        animation: google.maps.Animation.DROP,
        icon: viewModel.unlabelIcon
    })
    viewModel.statusCheck()
}

//   apply color to the marker 
function getIconImage(markerColor) {
    /**
     * getIconImage 
     * @param markerColor str hexcolor code 
     *     Color the map's marker with given marker color 
     * @return object that contains 
     *         img_url and coordinates 
     *         for plotting in googlemap
     * 
     * Ref: https://developers.google.com/maps/documentation/javascript/markers
     */
    var markerImage = new google.maps.MarkerImage(
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}