var TileService = (function() {

    "use strict";

    var repo = new NztaRepository();
    repo.retrieveAllIncidentsResponse = notifyTile;
    var notifier = null;
    
    var register = function() {

        var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();
        var trigger = new Windows.ApplicationModel.Background.TimeTrigger(15, false);
        builder.name = "live update";
        builder.taskEntryPoint = "Tasks\\UpdateTileTask.js";
        builder.setTrigger(trigger);
        builder.register();
    };

    function notifyTile(result) {

        var mess = "";

        if (result.length > 0)
            mess = result[0].eventComments;

        var template = Windows.UI.Notifications.TileTemplateType.tileSquareText04;
        var tileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(template);
        var tileTextAttributes = tileXml.getElementsByTagName("text");

        for (var i = 0; i < tileTextAttributes.length; i++) {
            tileTextAttributes[i].appendChild(tileXml.createTextNode(mess));
        }
        
        var currentTime = new Date();
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);
        tileNotification.expirationTime = new Date(currentTime.getTime() + 15 * 1 * 1000);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
        
        if (notifier != null)
            notifier();
    }

    var updateTile = function (notifyDone) {
        notifier = notifyDone;
        repo.retrieveAllIncidents();
    };

    var registerAndUpdateTile = function () {
        
        register();
        updateTile();
    };
    
    return { RegisterAndUpdate: registerAndUpdateTile, UpdateTile: updateTile };
})();