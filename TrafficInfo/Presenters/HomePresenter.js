(function() {
    "use strict";

    var presenter = function() {

        var self = this;

        self.updateViewWithCameraFromTarget = function (e, cameras) {
            
            var camera = null;

            for (var i = 0; i < cameras.length; i++) {
                
                if (cameras[i].getPushpin() == e.target) {
                    
                    camera = cameras[i];
                    break;
                }
            }

            if (camera)
                HomeCodeBehind.showCamera(camera);
        };
    };

    WinJS.Namespace.define("HomePresenter", {
        Presenter: presenter
    });
})();