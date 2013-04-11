var NztaRepository = (function() {

    "use strict";

    var self = this;
    this.headers = {
        username: "dmcliver",
        password: "ModPrime0#"
    };

    this.retrievAllLocationsWithTrafficResponse = null;
    this.retrieveAllCamerasResponse = null;
    
    this.retrieveAllLocationsWithTraffic = function() {
        
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/", headers: self.headers }).done(function (result) {
            var xml = result.responseXML;
            var locations = xml.querySelectorAll("getTrafficConditionsResponse > trafficConditions > motorways > locations");
            self.retrievAllLocationsWithTrafficResponse(locations);
        });
    };

    this.retrieveAllCameras = function() {
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/", headers: self.headers }).done(function (result) {
            
            var xml = result.responseXML;
            var cameras = xml.querySelectorAll("camera");
            self.retrieveAllCamerasResponse(cameras);
        });
    };
});