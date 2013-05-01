var Place = function (lat, lng, name) {

    Object.defineProperty(this, "lat", {

        get: function () {

            return lat;
        }
    });
    
    Object.defineProperty(this, "long", {

        get: function () {

            return lng;
        }
    });
    
    Object.defineProperty(this, "name", {

        get: function () {
            
            return name;
        }
    });
}