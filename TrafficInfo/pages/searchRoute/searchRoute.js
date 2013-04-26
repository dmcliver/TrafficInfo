(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endTxtBxId = "endLoc";
    var startTxtBxId = "startLoc";

    var startLocDetails = null;
    var endLocDetails = null;

    var textBoxFactory;

    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            textBoxFactory = new TextBoxFactory();

            textBox1 = textBoxFactory.createTextBox(startTxtBxId, "startSearchResultList", onStartSuggestedResult, updateStartLocDetails, updateStartLocDetails);
            textBox2 = textBoxFactory.createTextBox(endTxtBxId, "endSearchResultList", onEndSuggestedResult, updateEndLocDetails, updateEndLocDetails);

            $("#helpButton").click(function(evt) {
                WinJS.Navigation.navigate("/pages/help/help.html");
            });

            document.getElementById("bod").onclick = clearTextBoxes;
            document.getElementById("save").onclick = submit;

            var toggleSwitch = document.getElementById("settingSwitch");
            toggleSwitch.onchange = toggleControlEnable;
        }
    });

    function updateEndLocDetails(data) {
        endLocDetails = data;
        $("#endResult").text(data.bind_prop);
    }

    function updateStartLocDetails(data) {
        startLocDetails = data;
        $("#startResult").text(data.bind_prop);
    }

    function submit() {
        WinJS.Navigation.navigate("/pages/home/home.html");
        return false;
    }

    function clearTextBoxes() {
        textBox1.clear();
        textBox2.clear();
    }

    function onStartSuggestedResult(item) {
        startLocDetails = item;
        $("#startResult").text(item.bind_prop);
    }
    
    function onEndSuggestedResult(item) {
        endLocDetails = item;
        $("#endResult").text(item.bind_prop);
    }

    function toggleControlEnable(evt) {
        
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

