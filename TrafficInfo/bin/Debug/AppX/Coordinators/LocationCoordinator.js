var LocationCoordinator = (function (cameraCoordinateRepository) {
    
    "use strict";
    
    this.mapXmlToLocations = function (locationsXml) {

        var locations = [];

        for (var i = 0; i < locationsXml.length; i++) {

            var locationXml = locationsXml[i];
            var location = new Location();
            
            location.congestion = locationXml.querySelector("congestion").textContent;
            location.direction = locationXml.querySelector("direction").textContent;
            location.endLat = locationXml.querySelector("endLat").textContent;
            location.endLon = locationXml.querySelector("endLon").textContent;
            location.startLat = locationXml.querySelector("startLat").textContent;
            location.startLon = locationXml.querySelector("startLon").textContent;
            location.name = locationXml.querySelector("name").textContent;
            
            if (location.congestion.toLowerCase() != "free flow") {
                
                locations.push(location);
            }
        }
        return locations;
    };

    this.mapXmlToCameras = function (camerasXml) {
        
        var cameraCoordinatesToExclude = cameraCoordinateRepository.retrieveAllCameraCoordinatesToExclude();
        
        var coords = JSLINQ(cameraCoordinatesToExclude);
        var cameras = [];
        
        for (var i = 0; i < camerasXml.length; i++) {
            
            var cameraXml = camerasXml[i];
            
            var lat = cameraXml.querySelector("lat").textContent;
            var lon = cameraXml.querySelector("lon").textContent;

            if (coords.Any(function (c) { return c.lat == lat && c.lon == lon; }))
                continue;
            
            var url = cameraXml.querySelector("imageUrl").textContent;
            var name = cameraXml.querySelector("name").textContent;
            cameras.push(new Camera(lat, lon, url, name));
        }
        return cameras;
    };
    
    
});

