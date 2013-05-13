var SettingsPresenter = function(view,repo) {
    "use strict";

    this.setRefreshRateWithSettings = function () {
        
        var value = repo.retrieveRefreshRate();

        if (value != undefined) {
            var index = view.getRefreshRateIndexFromValue(value);
            view.setSelectedRateIndex(index);
        }
    };

    this.setRefreshRate = function(value) {
        repo.setRefreshRate(value);
    };
};