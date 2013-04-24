(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endTxtBxId = "endLoc";
    var startTxtBxId = "startLoc";
    
    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            textBox1 = createTextBox(startTxtBxId, "startSearchResultList");
            textBox2 = createTextBox(endTxtBxId, "endSearchResultList");
            
            document.getElementById("bod").onclick = clearTextBoxes;
            document.getElementById("save").onclick = null;

            var toggleSwitch = document.getElementById("settingSwitch");
            toggleSwitch.onchange = toggleControlEnable;
        }
    });

    function clearTextBoxes() {
        textBox1.clear();
        textBox2.clear();
    }

    function createTextBox(txtBxId, list) {
        
        var txtBox = new AutoCompleteTextBox(txtBxId, list);
        var locAutoCompleteStrategy = new AutoCompleteStrategy(new TextBoxAutoCompleteBehaviour(txtBox));
        locAutoCompleteStrategy.wireDataSourceToTxtBox();
        return txtBox;
    }

    function toggleControlEnable(evt) {
        
        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;
        
        document.getElementById(startTxtBxId).disabled = !enable;
        document.getElementById(endTxtBxId).disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }
})();

