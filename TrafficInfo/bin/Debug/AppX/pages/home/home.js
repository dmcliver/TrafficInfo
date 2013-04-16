﻿(function () {
    
    "use strict";

    var mapService;
    var nztaRepository;
    var coordinator;

    var thisMap;
    var cameraInfos;
    var charmBarService;
    
    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {

            charmBarService = new CharmBarService();
            charmBarService.getCurrentSelectedCamera = getCurrentCamera;

            document.getElementById("searchForLocation").addEventListener("click", searchForNewLocation);
            document.getElementById("searchResultList").winControl.addEventListener("selectionchanged", onSelectedCity);

            mapService = new MapService();
            nztaRepository = new NztaRepository();
            coordinator = new LocationCoordinator(new CameraCoordinateRepository());

            nztaRepository.retrievAllLocationsWithTrafficResponse = retrievAllLocationsWithTrafficResponse;
            nztaRepository.retrieveAllCamerasResponse = retrieveAllCamerasResponse;

            mapService.createMap(onMapCreated);
            
            function onMapCreated(map) {

                thisMap = map;
                Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);
                
                if (mapService.currentionLocation.indexOf("Auckland") !== -1) {
                    nztaRepository.retrieveAllLocationsWithTraffic();
                }

                if (mapService.currentionLocation.indexOf("New Zealand") !== -1) {
                    nztaRepository.retrieveAllCameras();
                }
                else {
                    setCameras();
                }
            }
        }
    });
    
    function getCurrentCamera() {
        if(cameraInfo != null)
            return cameraInfo.CameraUri;
        return null;
    }

    function setCameras() {

        var currentCoords = mapService.CurrentCoords;

        nztaRepository.retrieveAllCamerasNearBy(currentCoords.latitude, currentCoords.longitude, function (res) {
            cameraInfos = mapService.setMapWithCameras(thisMap, res, onCameraPushpinClick);
        });
    }

    function onSelectedCity() {
        
        document.getElementById("searchResultList").winControl.selection.getItems().done(function(iitems) {

            if (iitems.length > 0) {

                var item = iitems[0];
                var selectedCityName = item.data.name;

                mapService.findLocationFromCityName(selectedCityName, function (data) {
                    mapService.reOrientate(data.results[0]);
                    setCameras();
                });
            }
        });
    }

    function searchForNewLocation() {
        var value = document.getElementById("searchLocation").value;
        mapService.findLocationFromCityName(value, onSuccessfulSearch);
    }

    function onSuccessfulSearch(res) {
        
        if(res.results.length == 1) {

            mapService.reOrientate(res.results[0]);
            setCameras();
        }
        else {
            
            document.getElementById("extendedSearchTitle").style.display = 'block';
            var list = new WinJS.Binding.List(res.results);
            var listControl = document.getElementById("searchResultList");
            listControl.winControl.itemDataSource = list.dataSource;
        }
    }

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

    var cameraInfo;

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


