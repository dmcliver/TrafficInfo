var TrafficSettingsRepository = (function () {
    "use strict";

    this.retrieveCameraRefreshRate = function () {
        
        var value = Windows.Storage.ApplicationData.current.roamingSettings.values["refreshRate"];
        if (value == undefined) {
            value = "5";
        }
        value = parseInt(value);
        return value;
    };
});