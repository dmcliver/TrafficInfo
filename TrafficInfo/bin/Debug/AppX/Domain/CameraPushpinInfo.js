var CameraPushpinInfo = (function(pushPin,infoBox) {

    "use strict";

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