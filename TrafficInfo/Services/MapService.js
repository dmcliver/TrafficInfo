var MapService = (function() {

    "use strict";

    var self = this;
    this.callback = null;

    var searchManager = null;

    var thisMap = null;

    this.createMap = function (initMap) {

        self.callback = initMap;
        Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: self.BuildMap, culture: 'en-us', homeRegion: 'NZ' });
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: loadCurrentLocation });
    };

    this.currentionLocation = null;

    this.BuildMap = function() {

        var mapOptions = {
            credentials: "Aoko4s3Tuxs_k2PArX1i9Xea2mbQizENjlKA-Vbpvf_aPivwpxZqFuQ9pGe1ZhrQ",
        };

        thisMap = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
        searchManager = new Microsoft.Maps.Search.SearchManager(thisMap);
    };

    function loadCurrentLocation() {
        var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(thisMap);
        geoLocationProvider.getCurrentPosition({
            successCallback: onCurrentLocationObtained
        });
    }

    function onCurrentLocationObtained(locationResult) {
        
        searchManager.reverseGeocode({
            location: locationResult.center, callback: function (res, userData) {
                self.currentionLocation = res.name;
                self.callback(thisMap);
            }
        });
    }

    this.findLocationFromCityName = function (city, onSuccessfulSearch) {
        
        searchManager.geocode({where: city, callback: function(res, dat){
            onSuccessfulSearch(res);
        }});
    };

    this.reOrientate = function(searchResult) {
        thisMap.setView({center:searchResult.location });
    };

    this.setMapWithTrafficInfo = function (map, locations) {
        
        for (var i = 0; i < locations.length; i++) {
            
            var condition = locations[i];
            var pushPinLocation = new Microsoft.Maps.Location(condition.startLat, condition.startLon);
            var pinImage = condition.congestion == "Heavy" || condition.congestion == "Congested" ? "images/push_pin_orang.png" : condition.congestion == "Moderate" ? "images/push_pin_yellow.png" : "images/push_pin_red.png";
            var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { icon: pinImage, draggable: false });

            if (pinImage == "images/push_pin_red.png") {
                
                Microsoft.Maps.Events.addHandler(pushPin, 'click', function (e) { });
            }
            map.entities.push(pushPin);
        }
    };

    this.setMapWithCameras = function(map, cameras, onCameraPushpinClick) {

        var cameraInfos = [];
        for (var i = 0; i < cameras.length; i++) {
            
            var camera = cameras[i];
            var pushPinLocation = new Microsoft.Maps.Location(camera.Lat, camera.Lon);
            var htmlImageContent = "<div style='background-color:White;color:Black'><p>"+ camera.Name + " " + camera.Lat + " " + camera.Lon + "</p><img src='"+ camera.Url +"' /></div>";
            var infoBox = new Microsoft.Maps.Infobox(pushPinLocation, { visible: false, htmlContent: htmlImageContent });
            var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { icon: "images/webcam.png", draggable: false });
            Microsoft.Maps.Events.addHandler(pushPin, 'click', onCameraPushpinClick);
            map.entities.push(pushPin);
            map.entities.push(infoBox);
            cameraInfos.push(new CameraPushpinInfo(pushPin, infoBox));
        }
        return cameraInfos;
    };
});



