var RoamingSettingsRepository = function() {

    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    var endplace = "EndPlace";
    var startplace = "StartPlace";
    var settingslocation = "SettingsLocation";
    var startlat = "StartLat";
    var startlong = "StartLong";
    var endlat = "EndLat";
    var endlong = "EndLong";
    
    this.retrieveSettingsStatus = function() {
        return roamingSettings.values[settingslocation];
    };
    
    this.retrieveStartPlace = function() {

        return new Place(roamingSettings.values[startlat], roamingSettings.values[startlong],roamingSettings.values[startplace]);
    };
    
    this.retrieveEndPlace = function () {

        return new Place(roamingSettings.values[endlat], roamingSettings.values[endlong],roamingSettings.values[endplace]);
    };

    this.storeSettings = function(enable, start, end) {

        roamingSettings.values[settingslocation] = enable;
        roamingSettings.values[startlat] = start.lat;
        roamingSettings.values[startlong] = start.long;
        roamingSettings.values[endlat] = end.lat;
        roamingSettings.values[endlong] = end.long;
        roamingSettings.values[startplace] = start.name;
        roamingSettings.values[endplace] = end.name;
    };
};