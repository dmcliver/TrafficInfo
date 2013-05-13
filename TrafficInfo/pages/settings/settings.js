(function() {

    "use strict";

    var rate;
    var presenter;
    WinJS.UI.Pages.define("/pages/settings/settings.html", {

        ready: function (element, options) {

            rate = document.getElementById("refreshRate");
            rate.addEventListener("change", getRateValue);
            
            presenter = new SettingsPresenter(this, new RoamingSettingsRepository());
            presenter.setRefreshRateWithSettings();

            this.getRefreshRateIndexFromValue = function (value) {
                
                return _.map(rate.options, function(o) {
                    return o.value;
                }).indexOf(value);
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