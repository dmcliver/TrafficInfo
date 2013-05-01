(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endTxtBxIdName = "endLoc";
    var startTxtBxIdName = "startLoc";

    var endTxtBxId = "#endLoc";
    var startTxtBxId = "#startLoc";

    var startLocValid = "#startLocValid";
    var endLocValid = "#endLocValid";

    var allErrors = "#allErrors";

    var startLocDataModel = null;
    var endLocDataModel = null;

    var presenter;

    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {
            
            presenter = new SearchRoutePresenter(showSettings);
            
            textBox1 = new AutoCompleteTextBox(startTxtBxIdName, "startSearchResultList", onStartSuggestedResult, onStartSuggestedResult, onStartSuggestedResult, startLocIsInvalid);
            textBox2 = new AutoCompleteTextBox(endTxtBxIdName, "endSearchResultList", onEndSuggestedResult, onEndSuggestedResult, onEndSuggestedResult, endLocIsInvalid);

            $("#helpButton").click(function(evt) {
                WinJS.Navigation.navigate("/pages/help/help.html");
            });

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

        $(startTxtBxId).val(startPlace);
        $(endTxtBxId).val(endPlace);

        $(startLocValid).hide();
        $(endLocValid).hide();
    };

    function startLocIsInvalid() {
        startLocDataModel = null;
        $(startLocValid).show();
    }

    function endLocIsInvalid() {
        endLocDataModel = null;
        $(endLocValid).show();
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
            
            $(allErrors).text(validationMessage);
            $(allErrors).css('display', 'block');
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
        $(startTxtBxId).val(model.bind_prop);
        $(startLocValid).hide();
    }
    
    function onEndSuggestedResult(model) {
        
        endLocDataModel = model;
        $(endTxtBxId).val(model.bind_prop);
        $("#endLocValid").hide();
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

