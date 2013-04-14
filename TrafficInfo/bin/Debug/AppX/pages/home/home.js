(function () {
    
    "use strict";

    var mapService;
    var nztaRepository;
    var coordinator;

    var thisMap;
    var cameraInfos;

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {

            mapService = new MapService();
            nztaRepository = new NztaRepository();
            coordinator = new LocationCoordinator(new CameraCoordinateRepository());

            nztaRepository.retrievAllLocationsWithTrafficResponse = retrievAllLocationsWithTrafficResponse;
            nztaRepository.retrieveAllCamerasResponse = retrieveAllCamerasResponse;

            mapService.createMap(onMapCreated);
            
            function onMapCreated(map) {

                thisMap = map;
                Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);

                nztaRepository.retrieveAllCameras();
                nztaRepository.retrieveAllLocationsWithTraffic();
            }
        }
    });
    
    function hideInfobox() {
        
        for (var i = 0; i < cameraInfos.length; i++) 
            cameraInfos[i].clear();
    }

    function retrievAllLocationsWithTrafficResponse(locationsXml) {
        
        var locations = coordinator.mapXmlToLocations(locationsXml);
        mapService.setMapWithTrafficInfo(thisMap, locations);
    }

    function retrieveAllCamerasResponse(camerasXml) {
        
        var cameras = coordinator.mapXmlToCameras(camerasXml);
        cameraInfos = mapService.setMapWithCameras(thisMap, cameras, onCameraPushpinClick);
    }

    function onCameraPushpinClick(e) {
        
        var cameraInfo = _.filter(cameraInfos, function (c) {
            return c.getPushpin() == e.target;
        });

        cameraInfo[0].show();
    }
})();


