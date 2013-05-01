var RoamingSettingsRepository = function() {

    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var endplace = "EndPlace";
    var startplace = "StartPlace";
    var settingslocation = "SettingsLocation";
    
    this.retrieveSettingsStatus = function() {
        return roamingSettings.values[settingslocation];
    };
    
    this.retrieveStartPlace = function() {

        return roamingSettings.values[startplace];
    };
    
    this.retrieveEndPlace = function () {

        return roamingSettings.values[endplace];
    };

    this.storeSettings = function(enable, start, end) {

        roamingSettings.values[settingslocation] = enable;
        roamingSettings.values["StartLat"] = start.lat;
        roamingSettings.values["StartLong"] = start.long;
        roamingSettings.values["EndLat"] = end.lat;
        roamingSettings.values["EndLong"] = end.long;
        roamingSettings.values[startplace] = start.name;
        roamingSettings.values[endplace] = end.name;
    };
};