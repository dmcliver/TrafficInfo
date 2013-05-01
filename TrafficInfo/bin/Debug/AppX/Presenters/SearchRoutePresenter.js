var SearchRoutePresenter = function (view) {

    var settingsRepository = new RoamingSettingsRepository();

    this.showSettingsIfEnabled = function () {
        
        if (settingsRepository.retrieveSettingsStatus()) {
            
            var start = settingsRepository.retrieveStartPlace();
            var end = settingsRepository.retrieveEndPlace();
            view( start, end );
        }
    };

    this.storeLocations = function (start, end) {
        
        settingsRepository.storeSettings(true, start, end);
    };
};