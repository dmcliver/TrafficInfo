var MapService = (function() {

    "use strict";

    var self = this;
    this.mapInitializedCallback = null;

    var searchManager = null;
    var trafficeManager = null;
    var thisMap = null;

    this.createMap = function (initMap) {

        self.mapInitializedCallback = initMap;
        Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: self.BuildMap, culture: 'en-us', homeRegion: 'NZ' });
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
            bounds: MapBounds.Boundary
        };

        thisMap = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
        Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: trafficModuleLoaded });

        if (Windows.Storage.ApplicationData.current.roamingSettings.values["SettingsLocation"]) {
            
            var fromSettings = MapBounds.fromSettings();
            thisMap.setView({ bounds: fromSettings, zoom: 16 });
            self.mapInitializedCallback(thisMap);
        }
        else
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: loadCurrentLocation });
    };

    function loadCurrentLocation() {

        searchManager = new Microsoft.Maps.Search.SearchManager(thisMap);

        var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(thisMap);

        geoLocationProvider.getCurrentPosition({
            successCallback: self.onCurrentLocationObtained
        });
    }

    this.onCurrentLocationObtained = function(locationResult) {

        currentCoords = locationResult.center;

        searchManager.reverseGeocode({
            
            location: locationResult.center,
            callback: function (res, userData) {
                
                self.currentionLocation = res.name;
                self.mapInitializedCallback(thisMap);
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
        
        searchManager.geocode({
            bounds: MapBounds.Boundary, count: 20, where: city, callback: function (res, dat) {
            onSuccessfulSearch(res);
        }});
    };

    this.reOrientate = function (searchResult) {

        if (searchResult != null && searchResult != undefined) {

            currentCoords = searchResult.location;
            thisMap.setView({ center: currentCoords });
        }
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

            if (currentEntity == typeof Microsoft.Maps.Pushpin || currentEntity == typeof Microsoft.Maps.Infobox) {
                thisMap.entities.remove(currentEntity);
            }
        }
        showTraffic();
    };
});



