(function () {
    
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            
            var mapService = new MapService();
            var nztaRepository = new NztaRepository();
            var coordinator = new LocationCoordinator();
            
            mapService.createMap(onMapCreated);
            
            function onMapCreated(map) {
                
                nztaRepository.getAllLocationsWithTrafficResponse = function(locationsXml) {

                    var locations = coordinator.mapXmlToLocations(locationsXml);
                    mapService.setMapWithTrafficInfo(map, locations);
                };

                nztaRepository.getAllLocationsWithTraffic();
            }
        }
    });
})();


