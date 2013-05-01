var MapBounds = (function() {

    "use strict";

    var firstCorner = new Microsoft.Maps.Location(-32.657876, 166.157227);
    var secondCorner = new Microsoft.Maps.Location(-48.253941, 178.549805);
    
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    function boundaryCheck(placeResult) {
        
        var bestView = placeResult.bestView;
        var center = bestView.center;

        return checkBoundary(center);
    }

    function checkBoundary(location) {
        
        var longitude = location.longitude;

        if
        (
            location.latitude <= firstCorner.latitude
            && location.latitude >= secondCorner.latitude
            && longitude >= firstCorner.longitude
            && longitude <= secondCorner.longitude
        )
            return true;
        return false;
    }

    function fromAppSettings() {

        var startLat = roamingSettings.values["StartLat"];
        var startLong = roamingSettings.values["StartLong"];
        var endLat = roamingSettings.values["EndLat"];
        var endLong = roamingSettings.values["EndLong"];

        var edges = getLongitudeEdges(startLong, endLong);
        addLatitudeEdges(startLat, endLat, edges);
        
        edges.altitude = 1;
        edges.altitudeReference = Microsoft.Maps.AltitudeReference.ground;

        return Microsoft.Maps.LocationRect.fromCorners(new Microsoft.Maps.Location(edges.north, edges.west), new Microsoft.Maps.Location(edges.south,edges.east));
    }

    function getLongitudeEdges(startLong, endLong) {
        
        if (startLong < 0)
            return { west: endLong, east: startLong };
        if (endLong < 0)
            return { west: startLong, east: endLong };
        if ((startLong - endLong) < 0)
            return { west: startLong, east: endLong };
        return { west: endLong, east: startLong };
    }

    function addLatitudeEdges(startLat, endLat, edges) {
        
        if((startLat - endLat) < 0) {

            edges.north = endLat;
            edges.south = startLat;
        }
        else {
            
            edges.north = startLat;
            edges.south = endLat;
        }
    }

    return {
        Boundary: new Microsoft.Maps.LocationRect.fromCorners(firstCorner, secondCorner),
        isInBoundary: boundaryCheck,
        boundsCheck: checkBoundary,
        fromSettings: fromAppSettings
    };
})();

