UriEncoderService = (function () {
    
    //use magic string to use strict, really why? Coz js is crap, maybe?
    "use strict";

    var geocodeUri = "http://maps.googleapis.com/maps/api/geocode/json?address=";
    var geocodeUriPostfix = "&sensor=false";

    this.encode = function (value) {

        var encodedUriComponent = encodeURIComponent(value);
        var returnUri = geocodeUri + encodedUriComponent + geocodeUriPostfix;

        return returnUri;
    };

});