(function() {

    "use strict";

    var logger = function() {

        var self = this;

        self.log = function(message) {

            Windows.Storage.ApplicationData.current.localFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {

                Windows.Storage.FileIO.writeTextAsync(file, message);
            });
        };
    };

    WinJS.Namespace.define("Logging", {
       Logger:logger 
    });
})();