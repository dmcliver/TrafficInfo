var ValidatorService = (function() {

    "use strict";

    this.validate = function(xhr,place) {
        if (xhr === null || xhr === undefined || xhr.results.length <= 0) {
            return false;
        }
        return true;
    };
});