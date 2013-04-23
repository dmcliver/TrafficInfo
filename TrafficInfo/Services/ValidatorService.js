var ValidatorService = (function() {

    "use strict";

    this.validate = function(xhr,place) {
        if (xhr === null || xhr === undefined || xhr.results.length <= 0) {
            //document.getElementById("allErrors").style.display = 'block';
            //document.getElementById("allErrors").innerText = 'There were no results returned from the search for ' + place;
            return false;
        }
        return true;
    };
});