var TileNotificationFactory = function() {
    "use strict";

    this.create = function (templateContent) {
        return new Windows.UI.Notifications.TileNotification(templateContent);
    };
}