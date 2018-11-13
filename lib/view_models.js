// API key for uses fourSquare API
const CLIENTID = 'CGCETNLGWEUZTBUIGMDHJ3KV2E5FDGGZTN22TOCJZ1OKERBY'
const CLIENTSECERT = 'OKBTF3G2RL5QWQ5NZ5IKKFRQY3QM5PJDO0B51SKZIVNLVVB2'

function locationViewModel(location) { 
    /**
     * Creating a marker that is binding over the knockout.js
     *  Ref https://developers.google.com/maps/documentation/javascript/markers
     *  @param location object that contains latitude , longitude and title of the location
     *  
     *  @return label_model itself which used to apply functions to itself
     * 
     *  @property title: (str) name of the location
     *            marker: represent the google map marker 
     *  @property popUpInfo for binding all information to create InfoWindow
     *           {
     *              street: strNameOfStreet
     *              city:   strNameOfCity
     *              phone:  strPhoneNumber
     *           }
     *  @property enable: (bool) status of the marker is either disappear or appear
     */
    
    var self = this  
    this.title = location.title
    this.popoverTitle = ko.observable('')
    this.enable = ko.observable(false);
    this.position = location.location

    // obtaining all markers and location data to form a icon
    function initIconWithResponse(resource){ 
        // parsing the result of the request 
        var responseContent = resource.response.venues[0].location;

        // verified the response data is availiable 
        var strStreetResponse = responseContent.formattedAddress[0] ? responseContent.formattedAddress[0] : 'Street data not available' ;
        var strCityResponse = responseContent.formattedAddress [1] ? responseContent.formattedAddress [1] : 'City data not available '; 
        var strPhoneResponse = responseContent.formattedPhone ? responseContent.formattedPhone : 'Phone are not provided' ; 
        self.popUpInfo = { 
            street: strStreetResponse,
            city: strCityResponse, 
            phone: strPhoneResponse
        };
        // generate google map label
        // creating the goolge map marker and eventlistener
        initMarker(self);
        bindEventsOnIcon(self) 
    }
    
    this.enableIcon =() =>{ 
        // enabling the marker to be display 
        this.mapIcon.setMap(map); 
        bounds.extend(this.mapIcon.position);
        map.fitBounds(bounds);
    }
    // disable marker on filtering
    this.disableIcon =()=>{ this.mapIcon.setMap(null) }
    // bind the show function to click listView item InfoWindow popUp when click and the icon jumped

    this.show = () =>{ google.maps.event.trigger(self.mapIcon, 'click');}
    this.bounce = () =>{ google.maps.event.trigger(self.mapIcon , 'click');}
    
    // requesting to four Square for obtaining all of th informations
    requestFourSquare(location , initIconWithResponse)
    // adding status check to update the icon
    this.statusCheck =()=>{
        ko.computed(() =>{ 
            self.enable() === true ? self.enableIcon() : self.disableIcon()
        }
    )}
}


function AppViewModel (){ 
    /** 
     * Application view model for creating the view_model for entire application 
     *  @property searchQuery: strFiltering string for searching binded in textInput
     *  @property markers: a binded collection of locationViewModel for visualization
     *  @property locationlist: a binded collection of object which will be  display   
     *                          at the scroll bar ListView
     */
    initMap() // from map_utils for loading the map to webpage
    var app = this;
    app.searchQuery = ko.observable('');
    app.markers  = ko.observableArray();

    // initalizes the locations  each rendering would require recreate the viewModel obj
    locations.map((location)=>{
        app.markers().push(
            new locationViewModel(location))
    });
    // Ref http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    app.locationList = ko.computed(()=>{
        var query_str = app.searchQuery().toLowerCase()
        return filterMarker(query_str , app)
    }
    ,app)
}

function render(){ 
    //rendering the entire app-view-model
    ko.applyBindings(new AppViewModel())
}