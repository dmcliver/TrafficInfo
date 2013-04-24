(function () {

    "use strict";

    var geocodeRepo;
    var encodeService;
    var validator;
    
    var textBox1;
    var textBox2;

    WinJS.UI.Pages.define("/pages/searchRoute/searchRoute.html", {

        ready: function (element, options) {

            textBox1 = new AutoCompleteTextBox("startLoc", "startSearchResultList");
            textBox1.eventSpring = getSourceData1;

            textBox2 = new AutoCompleteTextBox("endLoc", "endSearchResultList");
            textBox2.eventSpring = getSourceData2;

            geocodeRepo = new GeocodeRepository();
            encodeService = new UriEncoderService();
            validator = new ValidatorService();
            
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

    function getSourceData1(text) {
        geocodeRepo.getCoords(encodeService.encode(text), getStartLatAndLong1);
    }

    function getSourceData2(text) {
        geocodeRepo.getCoords(encodeService.encode(text), getStartLatAndLong2);
    }

    function toggleControlEnable(evt) {
        
        var toggleSwitch = document.getElementById("settingSwitch");
        var enable = toggleSwitch.winControl.checked;
        
        document.getElementById("startLoc").disabled = !enable;
        document.getElementById("endLoc").disabled = !enable;
        document.getElementById("save").disabled = !enable;
    }

    function getStartLatAndLong1(xhr) {
        
        var start = document.getElementById("startLoc").value;
        
        if (validator.validate(xhr,start)) {

            var formattedList = mapToBindProp(xhr);
            textBox1.bind(formattedList.items);
        }
    }
    
    function getStartLatAndLong2(xhr) {
        var start = document.getElementById("endLoc").value;

        if (validator.validate(xhr, start)) {

            var formattedList = mapToBindProp(xhr);
            textBox2.bind(formattedList.items);
        }
    }

    function mapToBindProp(xhr) {
        var list = JSLINQ(xhr.results);
        var formattedList = list.Select(function (i) { return { bind_prop: i.formatted_address }; });
        return formattedList;
    }
    
})();

