(function () {
    "use strict";

    var cameraFixtureBuilder = function() {

        var self = this;

        var pushpin = null;

        self.addPushpin = function(pin) {

            pushpin = pin;
            return self;
        };

        self.build = function() {

            return { getPushpin: function() { return pushpin; } };
        };
    };

    WinJS.Namespace.define("CameraFixtureBuilder", {
       Builder: cameraFixtureBuilder 
    });
})();