(function() {

    "use strict";

    var rate;
    var presenter;
    WinJS.UI.Pages.define("/pages/settings/settings.html", {

        ready: function (element, options) {

            rate = document.getElementById("refreshRate");
            rate.addEventListener("change", this.getRateValue);
            
            presenter = new SettingsPresenter(this, new RoamingSettingsRepository());
            presenter.setRefreshRateWithSettings();

            this.getRefreshRateIndexFromValue = function (selectedRefreshRate) {

                var optVals = [];

                for (var i = 0; i < rate.options; i++) {
                    optVals.push(rate.options[i].value);
                }

                return optVals.indexOf(selectedRefreshRate);
            };

            this.setSelectedRateIndex = function(index) {
                rate.selectedIndex = index;
            };

            this.getRateValue = function(select) {
                var value = rate.options[rate.selectedIndex].value;
                presenter.setRefreshRate(value);
            };
        }
    });

})();