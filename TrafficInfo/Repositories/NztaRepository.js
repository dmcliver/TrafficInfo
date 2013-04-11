var NztaRepository = (function() {

    "use strict";

    var self = this;
    
    this.getAllLocationsWithTrafficResponse = null;

    this.getAllLocationsWithTraffic = function() {
        
        WinJS.xhr({ url: "https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/", headers: { username: "dmcliver", password: "ModPrime0#" } }).done(function (result) {
            var xml = result.responseXML;
            var locations = xml.querySelectorAll("getTrafficConditionsResponse > trafficConditions > motorways > locations");
            self.getAllLocationsWithTrafficResponse(locations);
        });
    };

    this.treisInformation = function() {

    };
});