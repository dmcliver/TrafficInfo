var LocationCoordinator = (function () {
    
    "use strict";

    var coordinatesToExclude = [
        { lat: -37, lon: 174.892 },
        { lat: -36.996, lon: 174.881 },
        { lat: -36.796, lon: 174.645 },
        { lat: -36.763, lon: 174.7 },
        { lat: -36.765, lon: 174.691 },
        { lat: -36.778, lon: 174.681 },
        { lat: -36.786, lon: 174.662 },
        { lat: -36.805, lon: 174.628},
        { lat: -36.808, lon: 174.621 },
        { lat: -36.813, lon: 174.612 },
        { lat: -36.914, lon: 174.75 },
        { lat: -36.928, lon: 174.782 },
        { lat: -36.945, lon: 174.793 },
        { lat: -36.953, lon: 174.792 },
        { lat: -36.996, lon: 174.835 },
        { lat: -36.998, lon: 174.865 },
        { lat: -36.996, lon: 174.874 },
        { lat: -36.997, lon: 174.891 },
        { lat: -37.028, lon: 174.91 },
        { lat: -37.053, lon: 174.918 },
        { lat: -37.062, lon: 174.924 },
        { lat: -37.085, lon: 174.936 }
    ];

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
        
        var cameras = [];
        
        for (var i = 0; i < camerasXml.length; i++) {
            
            var cameraXml = camerasXml[i];

            var coords = JSLINQ(coordinatesToExclude);
            
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

