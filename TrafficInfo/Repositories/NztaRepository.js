var NztaRepository = (function() {

    "use strict";

    var self = this;
    var hdrs = {
        username: "dmcliver",
        password: "ModPrime0#"
    };

    this.retrievAllLocationsWithTrafficResponse = null;
    this.retrieveAllCamerasResponse = null;
    
    this.retrieveAllCameras = function () {
        
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/", headers: hdrs }).done(function (result) {
            
            var xml = result.responseXML;
            var cameras = xml.querySelectorAll("camera");
            self.retrieveAllCamerasResponse(cameras);
        });
    };
});

