var GeocodeRepository = (function() {

    "use strict";
    var self = this;

    self.getCoords = function(uri, callback) {
        WinJS.xhr({ url: uri }).done(

            function (resp) {
                
                var res = JSON.parse(resp.responseText);
                callback(res);
            }
        );
    };
});