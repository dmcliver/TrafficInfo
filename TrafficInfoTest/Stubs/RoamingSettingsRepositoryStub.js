var RoamingSettingsRepositoryStub = function() {
    "use strict";

    var rate;

    this.onRetrieveRefreshRateReturn = function (r) {
        rate = r;
    };

    this.retrieveRefreshRate = function() {
        return rate;
    };
}