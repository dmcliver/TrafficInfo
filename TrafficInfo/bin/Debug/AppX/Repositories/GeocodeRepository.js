var GeocodeRepository = (function() {

    "use strict";
    var self = this;

    this.onError = null;

    self.getCoords = function(uri, callback) {
        WinJS.xhr({ url: uri }).done(

            function complete (resp) {
                
                var res = JSON.parse(resp.responseText);
                callback(res);
            },
            function error(resp) {
                self.onError();
            }
        );
    };
});