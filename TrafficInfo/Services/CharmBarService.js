var CharmBarService = (function(shareCoordinator) {

    "use strict";

    var self = this;
    this.getCurrentSelectedCamera = null;
    this.invokeSuggestedResults = null;

    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    dtm.addEventListener("datarequested", shareImage);
    var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

    WinJS.Application.onsettings = charmBarSettings;

    searchPane.onsuggestionsrequested = function (e) {
        self.invokeSuggestedResults(e);
    };

    function shareImage(e) {

        if (self.getCurrentSelectedCamera != null && self.getCurrentSelectedCamera() != null) {

            var deferral = e.request.getDeferral();

            var shareData = e.request.data;

            shareCoordinator.setShareDetails(shareData, self.getCurrentSelectedCamera());

            deferral.complete();
        }
    }

    function charmBarSettings(e) {

        e.detail.applicationcommands = {
            
            "cameraRefreshRate": {

                title: "Camera refresh rate",
                href: "/pages/settings/settings.html"
            }
        };
        
        WinJS.UI.SettingsFlyout.populateSettings(e);
    }

    function setShareDetails(e) {
        e.request.data.properties.title = "Traffic camera image";
        e.request.data.properties.description = "Traffic situation from selected camera: " + self.getCurrentSelectedCamera().Name;
    }
    
    function setUri(e) {
        var uri = new Windows.Foundation.Uri(self.getCurrentSelectedCamera().Uri);
        e.request.data.setUri(uri);
        return uri;
    }
    
    function setUriStream(e, uri) {
        var uriStream = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(uri);
        e.request.data.properties.thumbnail = uriStream;
    }
});

