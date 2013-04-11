var MapService = (function() {

    "use strict";

    var self = this;
    this.callback = null;

    this.createMap = function (initMap) {

        self.callback = initMap;
        Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: self.BuildMap, culture: 'en-us', homeRegion: 'NZ' });
    };

    this.BuildMap = function() {

        var mapOptions = {
            
            center: new Microsoft.Maps.Location(-36.7889, 174.771401),
            credentials: "Aoko4s3Tuxs_k2PArX1i9Xea2mbQizENjlKA-Vbpvf_aPivwpxZqFuQ9pGe1ZhrQ",
            zoom: 11
        };

        var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
        self.callback(map);
    };

    this.setMapWithTrafficInfo = function (map, locations) {
        
        for (var i = 0; i < locations.length; i++) {
            
            var condition = locations[i];
            var pushPinLocation = new Microsoft.Maps.Location(condition.startLat, condition.startLon);
            var pinImage = condition.congestion == "Heavy" ? "images/push_pin_orang.png" : condition.congestion == "Moderate" ? "images/push_pin_yellow.png" : "images/push_pin_red.png";

            var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { icon: pinImage, draggable: false });
            map.entities.push(pushPin);
        }
    };

    this.setMapWithCameras = function(map, cameras) {

        for (var i = 0; i < cameras.length; i++) {
            
            var camera = cameras[i];
            var pushPinLocation = new Microsoft.Maps.Location(camera.lat, camera.lon);
            var infoBox = new Microsoft.Maps.Infobox(pushPinLocation, { title: 'Info', visible: false });
            var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { draggable: false });
            Microsoft.Maps.Events.addHandler(pushPin, 'click', displayInfoBox);
            map.entities.push(pushPin);
            map.entities.push(infoBox);
        }
    };
    
    function displayInfoBox(e) {
        e.target.setOptions({ visible: true });
    }
});

