var TileUpdaterMock =  function() {
    "use strict";

    var updateWasCalled = false;

    this.update = function(obj) {
        updateWasCalled = true;
    };

    this.verify = function() {
        return updateWasCalled;
    };
}