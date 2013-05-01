var RoamingSettingsRepository = function() {

    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    this.retrieveSettingsStatus = function() {
        return roamingSettings.values["SettingsLocation"];
    };

    this.retrieveStartPlace = function() {

        return roamingSettings.values["StartPlace"];
    };
    
    this.retrieveEndPlace = function () {

        return roamingSettings.values["EndPlace"];
    };

    this.storeSettings = function(enable, start, end) {

        roamingSettings.values["SettingsLocation"] = enable;
        roamingSettings.values["StartLat"] = start.lat;
        roamingSettings.values["StartLong"] = start.long;
        roamingSettings.values["EndLat"] = end.lat;
        roamingSettings.values["EndLong"] = end.long;
        roamingSettings.values["StartPlace"] = start.name;
        roamingSettings.values["EndPlace"] = end.name;
    };
};