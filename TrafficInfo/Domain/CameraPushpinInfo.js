var CameraPushpinInfo = (function(pushPin,infoBox, cameraUri,cameraName) {

    "use strict";

    Object.defineProperty(this, "CameraUri", {
        get : function () {
            return cameraUri;
        }
    });

    Object.defineProperty(this, "CameraName", {
        get: function() {
            return cameraName;
        }
    });

    this.show = function() {
        infoBox.setOptions({ visible: true });
    };

    this.clear = function() {
        infoBox.setOptions({ visible: false });
    };

    this.getPushpin = function() {
        return pushPin;
    };
});