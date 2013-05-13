var PushpinFactoryStub = function() {
    "use strict";

    var pin;
    var infobox;

    this.createPin = function() {
        return pin;
    };

    this.createInfobox = function() {
        return infobox;
    };

    this.onCreatePinReturn = function(val) {
        pin = val;
    };

    this.onCreateInfoboxReturn = function(val) {
        infobox = val;
    };
}