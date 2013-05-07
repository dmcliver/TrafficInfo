var NztaRepository = (function (cameraUrl,incidentUrl) {

    "use strict";

    var self = this;
    var hdrs = {
        username: "dmcliver",
        password: "ModPrime0#"
    };

    var cameraU = cameraUrl == null ? "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/" : cameraUrl;
    var incidentU = incidentUrl == null ? "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TREIS/REST/FeedService/" : incidentUrl;

    this.retrievAllLocationsWithTrafficResponse = null;
    this.retrieveAllCamerasResponse = null;
    this.retrieveAllIncidentsResponse = null;
    this.onError = null;

    this.retrieveAllCameras = function () {

        WinJS.xhr({ url: cameraU, headers: hdrs }).done(function complete(result) {

            var xml = result.responseXML;
            var cameras = xml.querySelectorAll("camera");
            self.retrieveAllCamerasResponse(cameras);
        },
            
        function error(result) {
            self.onError();
        });
    };

    this.retrieveAllIncidents = function () {

        WinJS.xhr({ url: incidentU, headers: hdrs }).done(function complete(result) {

            var xml = result.responseXML;
            var roadEvents = xml.querySelectorAll("roadEvent");
            var enumerableRoadEvents = JSLINQ(roadEvents);

            var queryResult = enumerableRoadEvents.Select(function (re) {

                return {

                    eventComments: re.querySelector("eventComments").textContent,
                    eventType: re.querySelector("eventType").textContent,
                    location: re.querySelector("locationArea").textContent
                };
            }).Where(function (evt) {
                return evt.eventType == "Damage Report";
            }).items;

            self.retrieveAllIncidentsResponse(queryResult);
        },
            
        function error(result) {
            self.onError();
        });
    };
});

