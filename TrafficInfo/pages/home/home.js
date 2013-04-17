﻿(function () {
    
    "use strict";

    var mapService;
    var nztaRepository;
    var coordinator;

    var thisMap;
    var cameraInfos;
    var charmBarService;
    var cameraInfo;
    
    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            
            document.getElementById("searchResultList").winControl.addEventListener("selectionchanged", onSelectedCity);

            mapService = new MapService();
            nztaRepository = new NztaRepository();
            coordinator = new LocationCoordinator(new CameraCoordinateRepository());
            charmBarService = new CharmBarService();
            charmBarService.getCurrentSelectedCamera = getCurrentCamera;
            charmBarService.invokeSuggestedResults = integratedSearchForNewLocation;

            nztaRepository.retrieveAllCamerasResponse = retrieveAllCamerasResponse;
            mapService.createMap(onMapCreated);
            
            function onMapCreated(map) {

                thisMap = map;
                Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);
                nztaRepository.retrieveAllCameras();
            }
        }
    });
    
    function getCurrentCamera() {
        if(cameraInfo != null)
            return cameraInfo.CameraUri;
        return null;
    }

    function onSelectedCity() {
        
        document.getElementById("searchResultList").winControl.selection.getItems().done(function(iitems) {

            if (iitems.length > 0) {

                var item = iitems[0];
                var selectedCityName = item.data.name;

                mapService.findLocationFromCityName(selectedCityName, function (data) {
                    mapService.reOrientate(data.results[0]);
                });
            }
        });
    }

    function integratedSearchForNewLocation(e) {
        mapService.findLocationFromCityName(e.queryText, onSuccessfulSearch);
    }

    function onSuccessfulSearch(res) {
        
        if(res.results.length == 1) {
            mapService.reOrientate(res.results[0]);
        }
        else {
            
            var list = new WinJS.Binding.List(res.results);
            var listControl = document.getElementById("searchResultList");
            listControl.winControl.itemDataSource = list.dataSource;
        }
    }

    function hideInfobox() {
        
        for (var i = 0; i < cameraInfos.length; i++) 
            cameraInfos[i].clear();
    }

    function retrieveAllCamerasResponse(camerasXml) {
        
        var cameras = coordinator.mapXmlToCameras(camerasXml);
        cameraInfos = mapService.setMapWithCameras(thisMap, cameras, onCameraPushpinClick);
    }

    function onCameraPushpinClick(e) {
        
        var filteredCameras = _.filter(cameraInfos, function (c) {
            return c.getPushpin() == e.target;
        });

        if (filteredCameras.length > 0) {
            cameraInfo = filteredCameras[0];
            cameraInfo.show();
        }
    }
})();


