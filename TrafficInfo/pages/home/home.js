(function () {
    
    "use strict";

    var mapService;
    var nztaRepository;
    var coordinator;

    var thisMap;

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {

            mapService = new MapService();
            nztaRepository = new NztaRepository();
            coordinator = new LocationCoordinator();

            nztaRepository.retrievAllLocationsWithTrafficResponse = retrievAllLocationsWithTrafficResponse;
            nztaRepository.retrieveAllCamerasResponse = retrieveAllCamerasResponse;

            mapService.createMap(onMapCreated);
            
            function onMapCreated(map) {

                thisMap = map;

                nztaRepository.retrieveAllCameras();
                nztaRepository.retrieveAllLocationsWithTraffic();
            }
        }
    });
    
    function retrievAllLocationsWithTrafficResponse(locationsXml) {
        var locations = coordinator.mapXmlToLocations(locationsXml);
        mapService.setMapWithTrafficInfo(thisMap, locations);
    }

    function retrieveAllCamerasResponse(camerasXml) {
        var cameras = coordinator.mapXmlToCameras(camerasXml);
        mapService.setMapWithCameras(thisMap, cameras);
    }

})();


