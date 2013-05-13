var TileNotificationFactoryStub = function() {
    "use strict";

    var notification;

    this.onCreateReturn = function(tileNotfication) {
        notification = tileNotfication;
    };

    this.create = function(template) {
        return notification;
    };
}