(function () {
    
    "use strict";
    
    var textBox1;
    var textBox2;

    var endLoc = "endLoc";
    var startLoc = "startLoc";
    
    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            textBox1 = createTextBox(startLoc, "startSearchResultList");
            textBox2 = createTextBox(endLoc, "endSearchResultList");
            
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

    function createTextBox(loc, list) {
        
        var txtBox = new AutoCompleteTextBox(loc, list);
        var locAutoCompleteStrategy = new AutoCompleteStrategy(new TextBoxAutoCompleteBehaviour(txtBox, loc));
        txtBox.eventSpring = locAutoCompleteStrategy.getSourceData;
        return txtBox;
    }

    function toggleControlEnable(evt) {
        
        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;
        
        document.getElementById(startLoc).disabled = !enable;
        document.getElementById(endLoc).disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }
})();

