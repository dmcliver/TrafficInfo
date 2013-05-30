(function() {
    "use strict";

    var homeViewMock = function() {

        var self = this;

        var showCameraWasCalled = false;
        var camera = null;

        self.showCamera = function (c) {

            camera = c;
            showCameraWasCalled = true;
        };

        self.assertShowCameraWasCalled = function() {

            return showCameraWasCalled;
        };

        self.getCameraArgumentOnShowCameraCall = function() {
            return camera;
        };
    };

    WinJS.Namespace.define("HomeViewMock", {
       
        Mock: homeViewMock
    });
    
})();