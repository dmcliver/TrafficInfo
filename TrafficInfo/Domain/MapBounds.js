var MapBounds = (function() {

    "use strict";

    var firstCorner = new Microsoft.Maps.Location(-49.15297, 162.421875);
    var secondCorner = new Microsoft.Maps.Location(-33.431441, -178.505859);

    function boundaryCheck(placeResult) {
        
        var bestView = placeResult.bestView;
        var center = bestView.center;

        return checkBoundary(center);
    }

    function checkBoundary(location) {
        
        var longitude = location.longitude;

        if (longitude < 0) {
            longitude = 0 - longitude;
        }

        if
        (
            location.latitude >= firstCorner.latitude
            && location.latitude <= secondCorner.latitude
            && longitude >= firstCorner.longitude
            && longitude >= secondCorner.longitude
        )
            return true;
        return false;
    }

    return { Boundary: new Microsoft.Maps.LocationRect.fromCorners(firstCorner, secondCorner), isInBoundary: boundaryCheck, boundsCheck: checkBoundary };
})();

