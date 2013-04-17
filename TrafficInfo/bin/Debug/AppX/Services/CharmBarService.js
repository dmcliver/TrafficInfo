var CharmBarService = (function() {

    "use strict";

    var self = this;
    this.getCurrentSelectedCamera = null;
    this.invokeSuggestedResults = null;

    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

    dtm.addEventListener("datarequested", function (e) {

        if (self.getCurrentSelectedCamera != null && self.getCurrentSelectedCamera() != null) {

            var deferral = e.request.getDeferral();
            setShareDetails(e);
            var uri = setUri(e);
            setUriStream(e, uri);
            deferral.complete();
        }
    });

    searchPane.onsuggestionsrequested = function(e) {
        self.invokeSuggestedResults(e);
    };
    
    function setShareDetails(e) {
        e.request.data.properties.title = "Traffic camera image";
        e.request.data.properties.description = "Traffic situation from selected camera";
    }
    
    function setUri(e) {
        var uri = new Windows.Foundation.Uri(self.getCurrentSelectedCamera());
        e.request.data.setUri(uri);
        return uri;
    }
    
    function setUriStream(e, uri) {
        var uriStream = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(uri);
        e.request.data.properties.thumbnail = uriStream;
    }
});

