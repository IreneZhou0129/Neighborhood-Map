var error_msg;

function requestFourSquare( node , setMarker){ 
    /**
     * request details of the node # location and set the properties in marker
     * in foursquare API
     * @param node object contains 
     * { 
     *      title: ,  
     *      location: { 
     *              lat: lng:
     *      }
     * } 
     * @param marker marker_view_model in view_models.js 
     */
    var lat = node.location.lat;
    var long = node.location.lng;
    
    // formatted the query string
    var url = 'https://api.foursquare.com/v2/venues/search?ll=' + lat + "," + long;
    url += '&client_id='+ CLIENTID + '&client_secret=' + CLIENTSECERT; // parse API keys
    url += '&v=20160118'

    var popUpError = (errorResponse) => { 
        if( !error ){
            error = true;
            alert("FourSquare Error please contact administrator xiaoxinzhou0@gmail.com" )
        }
    }

    $.getJSON(url).done(setMarker).fail(popUpError)
}


function filterMarker(query_str,viewModel){ 
    /** 
     * filterMarker 
     * Filtering the marker with given query_str
     * @param query_str: Input of the user Str
     * @param items: collection of mapIcon that will be fitlered
     * 
     * @return 
     * Ref http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
     */
 
    if (query_str){ 
        return ko.utils.arrayFilter( 
            viewModel.markers(), 
            (location) => { 
                let cond = location.title.toLowerCase().includes(query_str)
                location.enable(cond);
                return cond
        });
    }
    viewModel.markers().forEach((location)=>{ 
        location.enable(true)
    })
    return viewModel.markers()
}