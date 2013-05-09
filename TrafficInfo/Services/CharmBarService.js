var CharmBarService = (function(shareCoordinator) {

    "use strict";

    var self = this;
    this.getCurrentSelectedCamera = null;
    this.invokeSuggestedResults = null;

    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    
    if(dtm.ondatarequested == null)
        dtm.ondatarequested =  shareImage;

    var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

    WinJS.Application.onsettings = charmBarSettings;

    searchPane.onsuggestionsrequested = function (e) {
        self.invokeSuggestedResults(e);
    };

    function shareImage(e) {

        if (self.getCurrentSelectedCamera != null && self.getCurrentSelectedCamera() != null) {

            var deferral = e.request.getDeferral();
            
            shareCoordinator.setShareDetails(e.request.data, self.getCurrentSelectedCamera());

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
});

