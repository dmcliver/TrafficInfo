(function() {

    "use strict";

    var rate;

    WinJS.UI.Pages.define("/pages/settings/settings.html", {

        ready: function (element, options) {

            rate = document.getElementById("refreshRate");

            var optVals = _.map(rate.options, function (o) {
                return o.value;
            });
            
            var value = Windows.Storage.ApplicationData.current.roamingSettings.values["refreshRate"];

            if (value != undefined) {
                var index = optVals.indexOf(value);
                rate.selectedIndex = index;
            }
            
            rate.addEventListener("change", getRateValue);
        }
    });
    
    function getRateValue(select) {
        var value = rate.options[rate.selectedIndex].value;
        Windows.Storage.ApplicationData.current.roamingSettings.values["refreshRate"] = value;
    }

})();