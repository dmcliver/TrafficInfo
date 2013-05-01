var TileService = (function() {

    "use strict";

    var repo = new NztaRepository();
    repo.retrieveAllIncidentsResponse = notifyTile;
    var notifier = null;
    var updater = null;
    var register = function() {

        var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();
        var trigger = new Windows.ApplicationModel.Background.TimeTrigger(15, false);
        builder.name = "live update";
        builder.taskEntryPoint = "Tasks\\UpdateTileTask.js";
        builder.setTrigger(trigger);
        builder.register();
    };

    function notifyTile(result) {

        result = [{ eventComments: "one" }, { eventComments: "two" }, { eventComments: "three" }, { eventComments: "four" }, { eventComments: "five" }];

        for (var j = 0; j < result.length && j < 5; j++) {

            var mess = result[j].eventComments;

            var template = Windows.UI.Notifications.TileTemplateType.tileSquareText04;
            var tileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(template);
            var tileTextAttributes = tileXml.getElementsByTagName("text");
            
            tileTextAttributes[0].appendChild(tileXml.createTextNode(mess));

            var currentTime = new Date();
            var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);
            tileNotification.expirationTime = new Date(currentTime.getTime() + 60 * 1 * 1000);
            if (updater == null) {
                updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
                updater.enableNotificationQueue(true);
            }
            updater.update(tileNotification);

            if (notifier != null)
                notifier();
        }
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