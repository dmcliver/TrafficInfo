var TileNotificationDummy = function() {
    "use strict";

    var updateWasCalled = false;

    this.update = function(obj) {
        updateWasCalled = true;
    };

    this.verifyUpdate = function() {
        return updateWasCalled;
    };
};