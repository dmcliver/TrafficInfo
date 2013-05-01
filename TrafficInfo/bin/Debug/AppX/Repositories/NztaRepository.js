﻿var NztaRepository = (function() {

    "use strict";

    var self = this;
    var hdrs = {
        username: "dmcliver",
        password: "ModPrime0#"
    };

    this.retrievAllLocationsWithTrafficResponse = null;
    this.retrieveAllCamerasResponse = null;
    this.retrieveAllIncidentsResponse = null;

    this.retrieveAllCameras = function () {
        
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/", headers: hdrs }).done(function (result) {
            
            var xml = result.responseXML;
            var cameras = xml.querySelectorAll("camera");
            self.retrieveAllCamerasResponse(cameras);
        });
    };

    this.retrieveAllIncidents = function() {
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TREIS/REST/FeedService/", headers: hdrs }).done(function (result) {

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
        });
    };
});

