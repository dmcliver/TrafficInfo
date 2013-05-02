(function () {
    
    "use strict";

    var mapService;
    var nztaRepository;
    var coordinator;

    var thisMap;
    var cameraInfos;
    var charmBarService;
    var cameraInfo;
    var value;
    var listViewControl;
    var listViewCollection;
    
    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            
            listViewControl = document.getElementById("searchResultList").winControl;
            listViewControl.addEventListener("selectionchanged", onSelectedCity);
            listViewControl.addEventListener("iteminvoked", firePopupLeftClick);
            
            document.getElementById("helpCmd").winControl.addEventListener("click", showHelp);
            document.getElementById("favCmd").winControl.addEventListener("click", showSettings);
            
            mapService = new MapService();
            nztaRepository = new NztaRepository();
            new TileService().RegisterAndUpdate();
            coordinator = new LocationCoordinator(new CameraCoordinateRepository());
            charmBarService = new CharmBarService();
            var trafficSettingsRepository = new TrafficSettingsRepository();

            charmBarService.getCurrentSelectedCamera = getCurrentCamera;
            charmBarService.invokeSuggestedResults = integratedSearchForNewLocation;
            nztaRepository.retrieveAllCamerasResponse = retrieveAllCamerasResponse;
            value = trafficSettingsRepository.retrieveCameraRefreshRate();
            mapService.createMap(onMapCreated);
        }
    });
    
    function firePopupLeftClick(evt) {

        var index = evt.detail.itemIndex;
        var selectedLocation = listViewCollection.getItem(index).data;
        navigateToLocation(selectedLocation);
    }

    function onMapCreated(map) {

        thisMap = map;
        Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);
        nztaRepository.retrieveAllCameras();
        setTimeout(refreshCameras, value * 60 * 1000);
    }

    function refreshCameras() {
        
        mapService.clearMap();
        nztaRepository.retrieveAllCameras();
        setTimeout(refreshCameras, value * 60 * 1000);
    }

    function getCurrentCamera() {
        
        if(cameraInfo != null)
            return cameraInfo.CameraUri;
        return null;
    }

    function onSelectedCity() {
        
        listViewControl.selection.getItems().done(function (iitems) {

            if (iitems.length > 0) {

                var item = iitems[0];
                navigateToLocation(item.data);
            }
        });
    }

    function navigateToLocation(selectedLocation) {
        
        var selectedCityName = selectedLocation.name;

        mapService.findLocationFromCityName(selectedCityName, function (data) {
            mapService.reOrientate(data.results[0]);
            listViewControl.itemDataSource = new WinJS.Binding.List([]).dataSource;
        });
    }

    function integratedSearchForNewLocation(e) {
        mapService.findLocationFromCityName(e.queryText, onSuccessfulSearch);
    }

    function onSuccessfulSearch(res) {
        
        var linq = JSLINQ(res.results);

        var filterResults = linq.Where(function(r) {
            return MapBounds.isInBoundary(r);
        }).Distinct(function(r) {
            return r.name;
        });

        listViewCollection = new WinJS.Binding.List(filterResults.items);
        bindSearchResultsListControl(listViewCollection);
    }

    function bindSearchResultsListControl(list) {
        
        listViewControl.itemDataSource = list.dataSource;
    }

    function hideInfobox() {

        bindSearchResultsListControl(new WinJS.Binding.List([]));

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
    
    function showHelp() {
        WinJS.Navigation.navigate('/pages/help/help.html');
    }
    
    function showSettings() {
        WinJS.Navigation.navigate('/pages/searchRoute/searchRoute.html');
    }
})();


