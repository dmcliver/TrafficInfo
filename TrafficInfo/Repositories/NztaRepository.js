var NztaRepository = (function() {

    "use strict";

    var self = this;
    var hdrs = {
        username: "dmcliver",
        password: "ModPrime0#"
    };

    this.retrievAllLocationsWithTrafficResponse = null;
    this.retrieveAllCamerasResponse = null;
    
    this.retrieveAllLocationsWithTraffic = function() {
        
        WinJS.xhr({url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/", headers: hdrs }).done(function (result) {
            
            var xml = result.responseXML;
            var locations = xml.querySelectorAll("getTrafficConditionsResponse > trafficConditions > motorways > locations");
            self.retrievAllLocationsWithTrafficResponse(locations);
        });
    };

    this.retrieveAllCameras = function () {
        
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/", headers: hdrs }).done(function (result) {
            
            var xml = result.responseXML;
            var cameras = xml.querySelectorAll("camera");
            self.retrieveAllCamerasResponse(cameras);
        });
    };

    this.retrieveAllCamerasNearBy = function (lat, lon, fin) {

        var coords = "lat=" + lat + "&lng=" + lon;
        var url = "http://api.webcams.travel/rest?method=wct.webcams.list_nearby&devid=07620a517e18bf570ecee1f27b6c45e8&";
        var req = url + coords;

        var webcamResult = [];

        WinJS.xhr({ url: req }).done(function (res) {
            
            var xml = res.responseXML;
            var webcams = xml.querySelectorAll("webcam");
            var count = xml.querySelector("count").textContent;
            
            if (count == "0")
                return;

            for (var i = 0; i < webcams.length; i++) {
                
                var webcam = webcams[i];
                
                var latRes = webcam.querySelector("latitude").textContent;
                var lngRes = webcam.querySelector("longitude").textContent;
                var srcUrl = webcam.querySelector("source_url").textContent;
                var img = webcam.querySelector("thumbnail_url").textContent;
                var name = webcam.querySelector("title").textContent;

                //if (srcUrl.indexOf("traffic") != -1) {
                    webcamResult.push(new Camera(latRes, lngRes, img, name));
               // }
            }

            fin(webcamResult);
        });
    };
});

