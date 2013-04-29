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

            textBox1 = textBoxFactory.createTextBox(startTxtBxId, "startSearchResultList", onStartSuggestedResult, onStartSuggestedResult, onStartSuggestedResult, startLocIsInvalid);
            textBox2 = textBoxFactory.createTextBox(endTxtBxId, "endSearchResultList", onEndSuggestedResult, onEndSuggestedResult, onEndSuggestedResult, endLocIsInvalid);

            $("#helpButton").click(function(evt) {
                WinJS.Navigation.navigate("/pages/help/help.html");
            });

            document.getElementById("startLoc").addEventListener("focus", clearTextBox2);
            document.getElementById("endLoc").addEventListener("focus", clearTextBox1);

            document.getElementById("bod").onclick = clearTextBoxes;
            document.getElementById("save").onclick = submit;

            var toggleSwitch = document.getElementById("settingSwitch");
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
        
        if(startLocDetails == null) {
            $("#allErrors").text("Start location is not valid");
            $("#allErrors").css('display','block');
            return false;
        }
        
        if (endLocDetails == null) {
            $("#allErrors").text("End location is not valid");
            $("#allErrors").css('display', 'block');
            return false;
        }
        
        WinJS.Navigation.navigate("/pages/home/home.html");
        return false;
    }

    function clearTextBoxes() {
        textBox1.clear();
        textBox2.clear();
    }

    function onStartSuggestedResult(item) {
        
        startLocDetails = item;
        $("#startLocValid").hide();
    }
    
    function onEndSuggestedResult(item) {
        endLocDetails = item;
        $("#endLocValid").hide();
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

