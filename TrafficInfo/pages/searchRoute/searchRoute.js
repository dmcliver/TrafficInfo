(function () {

    "use strict";

    var geocodeRepo = null;
    var encodeService = null;
    var validator = null;
    var startLocs = null;

    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            startLocs = new WinJS.Binding.List([]);
            document.getElementById("startSearchResultList").winControl.itemDataSource = startLocs.dataSource;

            geocodeRepo = new GeocodeRepository();
            validator = new ValidatorService();
            encodeService = new UriEncoderService();

            document.getElementById("startLoc").onkeyup = saveDetails;
            document.getElementById("bod").onclick = clearAutocomplete;
            document.getElementById("save").onclick = saveDetails;

            var toggleSwitch = document.getElementById("settingSwitch");
            toggleSwitch.onchange = toggleControlEnable;
        }
    });

    function toggleControlEnable(evt) {
        
        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;
        
        document.getElementById("startLoc").disabled = !enable;
        document.getElementById("endLoc").disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }

    var startLoc;

    function clearAutocomplete() {
        startLocs.splice(0, startLocs.length);
    }

    function saveDetails() {

        clearAutocomplete();

        document.getElementById("allErrors").style.display = 'none';

        startLoc = document.getElementById("startLoc");
        var endLoc = document.getElementById("endLoc");

        var startUri = encodeService.encode(startLoc);
        var endUri = encodeService.encode(endLoc);

        geocodeRepo.getCoords(startUri, getStartLatAndLong);

        return false;
    }

    function getStartLatAndLong(xhr) {
        
        var start = document.getElementById("startLoc").value;
        
        if (validator.validate(xhr,start)) {

            var list = JSLINQ(xhr.results);
            var formattedList = list.Select(function (i) { return { name: i.formatted_address }; });
            _.each(formattedList.items, function(i) {
                startLocs.push(i);
            });
        }
    }
})();