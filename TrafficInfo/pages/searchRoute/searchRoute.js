(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endTxtBxId = "endLoc";
    var startTxtBxId = "startLoc";

    var startLocDetails = null;
    var endLocDetails = null;

    var textBoxFactory;
    var roamingSettings;
    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            textBoxFactory = new TextBoxFactory();
            roamingSettings  = Windows.Storage.ApplicationData.current.roamingSettings;
            
            textBox1 = textBoxFactory.createTextBox(startTxtBxId, "startSearchResultList", onStartSuggestedResult, onStartSuggestedResult, onStartSuggestedResult, startLocIsInvalid);
            textBox2 = textBoxFactory.createTextBox(endTxtBxId, "endSearchResultList", onEndSuggestedResult, onEndSuggestedResult, onEndSuggestedResult, endLocIsInvalid);

            $("#helpButton").click(function(evt) {
                WinJS.Navigation.navigate("/pages/help/help.html");
            });

            var toggleSwitch = document.getElementById("settingSwitch");
            
            if (roamingSettings.values["SettingsLocation"]) {

                toggleSwitch.winControl.checked = true;

                toggleControlEnable({ });

                $("#startLoc").val(roamingSettings.values["StartPlace"]);
                $("#endLoc").val(roamingSettings.values["EndPlace"]);
            }

            document.getElementById("startLoc").addEventListener("focus", clearTextBox2);
            document.getElementById("endLoc").addEventListener("focus", clearTextBox1);

            document.getElementById("bod").onclick = clearTextBoxes;
            document.getElementById("save").onclick = submit;

            toggleSwitch.onchange = toggleControlEnable;
        }
    });

    function startLocIsInvalid() {
        startLocDetails = null;
        $("#startLocValid").show();
    }

    function endLocIsInvalid() {
        endLocDetails = null;
        $("#endLocValid").show();
    }

    function clearTextBox2(evt) {
        textBox2.clear();
    }

    function clearTextBox1(evt) {
        textBox1.clear();
    }

    function submit() {

        if (validateErrors(startLocDetails, "Start location is not valid") && validateErrors(endLocDetails, "End location is not valid")) {

            roamingSettings.values["SettingsLocation"] = true;
            roamingSettings.values["StartLat"] = startLocDetails.location.latitude;
            roamingSettings.values["StartLong"] = startLocDetails.location.longitude;
            roamingSettings.values["EndLat"] = endLocDetails.location.latitude;
            roamingSettings.values["EndLong"] = endLocDetails.location.longitude;
            roamingSettings.values["StartPlace"] = startLocDetails.bind_prop;
            roamingSettings.values["EndPlace"] = endLocDetails.bind_prop;
            
            WinJS.Navigation.navigate("/pages/home/home.html");
            return false;
        }
        return false;
    }

    function validateErrors(locDetails, validationMessage) {
        
        if (startLocDetails == null) {
            
            $("#allErrors").text(validationMessage);
            $("#allErrors").css('display', 'block');
            return false;
        }
        return true;
    }

    function clearTextBoxes() {
        textBox1.clear();
        textBox2.clear();
    }

    function onStartSuggestedResult(item) {
        
        startLocDetails = item;
        $("#startLoc").val(item.bind_prop);
        $("#startLocValid").hide();
    }
    
    function onEndSuggestedResult(item) {
        
        endLocDetails = item;
        $("#endLoc").val(item.bind_prop);
        $("#endLocValid").hide();
    }

    function toggleControlEnable(evt) {
        
        roamingSettings.values["SettingsLocation"] = false;

        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;
        
        document.getElementById(startTxtBxId).disabled = !enable;
        document.getElementById(endTxtBxId).disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }
    
    function navigateToHelp() {
        WinJS.Navigation.navigate("/pages/help/help.html");
    }
})();

