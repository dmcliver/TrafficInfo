﻿var MapService = (function() {

    "use strict";

    var self = this;
    this.callback = null;

    var searchManager = null;
    var trafficeManager = null;
    var thisMap = null;

    this.createMap = function (initMap) {

        self.callback = initMap;
        Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: self.BuildMap, culture: 'en-us', homeRegion: 'NZ' });
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: loadCurrentLocation });
        Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: trafficModuleLoaded });
    };

    var currentionLocation = null;
    var currentCoords = null;

    Object.defineProperty(this, "CurrentLocation", {
        get: function () {
            return currentionLocation;
        }
    });

    Object.defineProperty(this, "CurrentCoords", {
        get: function () {
            return currentCoords;
        }
    });
    
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
            successCallback: self.onCurrentLocationObtained
        });
    }

    this.onCurrentLocationObtained = function(locationResult) {

        currentCoords = locationResult.center;

        searchManager.reverseGeocode({
            location: locationResult.center,
            callback: function(res, userData) {
                self.currentionLocation = res.name;
                self.callback(thisMap);
            }
        });
    };

    function trafficModuleLoaded() {
        
        trafficeManager = new Microsoft.Maps.Traffic.TrafficManager(thisMap);
        showTraffic();
    }

    function showTraffic() {
        trafficeManager.show();
        trafficeManager.showIncidents();
        trafficeManager.showFlow();
    }

    this.findLocationFromCityName = function (city, onSuccessfulSearch) {
        
        searchManager.geocode({where: city, callback: function(res, dat){
            onSuccessfulSearch(res);
        }});
    };

    this.reOrientate = function (searchResult) {
        currentCoords = searchResult.location;
        thisMap.setView({ center: currentCoords });
    };
    
    this.setMapWithCameras = function(map, cameras, onCameraPushpinClick) {

        var cameraInfos = [];
        for (var i = 0; i < cameras.length; i++) {
            
            var camera = cameras[i];
            var pushPinLocation = new Microsoft.Maps.Location(camera.Lat, camera.Lon);
            var htmlImageContent = "<div style='background-color:White;color:Black'><p>"+ camera.Name + "</p><img src='"+ camera.Url +"' /></div>";
            var infoBox = new Microsoft.Maps.Infobox(pushPinLocation, { visible: false, htmlContent: htmlImageContent });
            var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { icon: "images/webcam.png", draggable: false });
            Microsoft.Maps.Events.addHandler(pushPin, 'click', onCameraPushpinClick);
            map.entities.push(pushPin);
            map.entities.push(infoBox);
            cameraInfos.push(new CameraPushpinInfo(pushPin, infoBox, camera.Url));
        }
        return cameraInfos;
    };

    this.clearMap = function () {
        for (var i = 0; i < thisMap.entities.getLength(); i++) {
            var currentEntity = thisMap.entities[i];
            if(currentEntity == typeof  Microsoft.Maps.Pushpin || currentEntity == typeof  Microsoft.Maps.Infobox ) {
                thisMap.entities.remove(currentEntity);
            }
        }
        showTraffic();
    };
});



