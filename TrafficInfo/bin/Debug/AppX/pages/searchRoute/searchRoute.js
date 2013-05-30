(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endTxtBxIdName = "endLoc";
    var startTxtBxIdName = "startLoc";
    
    var startLocValid = "startLocValid";
    var endLocValid = "endLocValid";

    var allErrors = "allErrors";

    var startLocDataModel = null;
    var endLocDataModel = null;

    var presenter;

    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {
            
            presenter = new SearchRoutePresenter(showSettings);
            
            textBox1 = new AutoCompleteTextBox(startTxtBxIdName, "startSearchResultList", onStartSuggestedResult, onStartSuggestedResult, onStartSuggestedResult, startLocIsInvalid);
            textBox2 = new AutoCompleteTextBox(endTxtBxIdName, "endSearchResultList", onEndSuggestedResult, onEndSuggestedResult, onEndSuggestedResult, endLocIsInvalid);

            document.getElementById("helpButton").onclick = function() {
                WinJS.Navigation.navigate("/pages/help/help.html");
            };
            
            var toggleSwitch = document.getElementById("settingSwitch");

            presenter.showSettingsIfEnabled();
            
            document.getElementById(startTxtBxIdName).addEventListener("focus", clearTextBox2);
            document.getElementById(endTxtBxIdName).addEventListener("focus", clearTextBox1);

            document.getElementById("bod").onclick = clearTextBoxes;
            document.getElementById("save").onclick = submit;

            toggleSwitch.onchange = toggleControlEnable;
        }
    });

    var showSettings = function(startPlace, endPlace) {

        document.getElementById("settingSwitch").winControl.checked = true;

        enableControls();

        document.getElementById(startTxtBxIdName).value = startPlace.name;
        document.getElementById(endTxtBxIdName).value = endPlace.name;

        startLocDataModel = new AutoCompleteTextBoxModel(startPlace.name, startPlace.lat, startPlace.long);
        endLocDataModel = new AutoCompleteTextBoxModel(endPlace.name, endPlace.lat, endPlace.long);

        document.getElementById(startLocValid).style.display = 'none';
        document.getElementById(endLocValid).style.display = 'none';
    };

    function startLocIsInvalid() {
        startLocDataModel = null;
        document.getElementById(startLocValid).style.display = 'block';
    }

    function endLocIsInvalid() {
        endLocDataModel = null;
        document.getElementById(endLocValid).style.display = 'block';
    }

    function clearTextBox2(evt) {
        textBox2.clear();
    }

    function clearTextBox1(evt) {
        textBox1.clear();
    }

    function submit() {

        if (validateErrors(startLocDataModel, "Start location is not valid") && validateErrors(endLocDataModel, "End location is not valid")) {

            var startLocation = startLocDataModel.location;
            var endLocation = endLocDataModel.location;

            var startPlace = new Place(startLocation.latitude, startLocation.longitude, startLocDataModel.bind_prop);
            var endPlace = new Place(endLocation.latitude, endLocation.longitude, endLocDataModel.bind_prop);

            presenter.storeLocations(startPlace, endPlace);
            
            WinJS.Navigation.navigate("/pages/home/home.html");
            return false;
        }
        return false;
    }

    function validateErrors(locDetails, validationMessage) {
        
        if (startLocDataModel == null) {
            
            document.getElementById(allErrors).innerText = validationMessage;
            document.getElementById(allErrors).style.display = 'block';
            return false;
        }
        return true;
    }

    function clearTextBoxes() {
        textBox1.clear();
        textBox2.clear();
    }

    function onStartSuggestedResult(model) {
        
        startLocDataModel = model;
        document.getElementById(startTxtBxIdName).value = model.bind_prop;
        document.getElementById(startLocValid).style.display = 'none';
    }
    
    function onEndSuggestedResult(model) {
        
        endLocDataModel = model;
        document.getElementById(endTxtBxIdName).value = model.bind_prop;
        document.getElementById(endLocValid).style.dislay = 'none';
    }

    function toggleControlEnable(evt) {
        
        Windows.Storage.ApplicationData.current.roamingSettings.values["SettingsLocation"] = false;
        enableControls();
    }
    
    function enableControls() {
        
        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;

        document.getElementById(startTxtBxIdName).disabled = !enable;
        document.getElementById(endTxtBxIdName).disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }

    function navigateToHelp() {
        WinJS.Navigation.navigate("/pages/help/help.html");
    }
})();

