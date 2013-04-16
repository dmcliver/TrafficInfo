var CameraPushpinInfo = (function(pushPin,infoBox, cameraUri) {

    "use strict";

    Object.defineProperty(this, "CameraUri", {
        get : function () {
            return cameraUri;
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