var Camera = (function(lat, lon, url, name) {

    "use strict";

    Object.defineProperty(this, "Lat", {
        get: function () {
            return lat;
        }
    });
    
    Object.defineProperty(this, "Lon", {
        get: function () {
            return lon;
        }
    });
    
    Object.defineProperty(this, "Url", {
        get: function () {
            return url;
        }
    });
    
    Object.defineProperty(this, "Name", {
        get: function () {
            return name;
        }
    });
});

