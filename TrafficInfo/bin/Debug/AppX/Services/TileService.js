var TileService = (function(squareDecorator, wideDecorator, tileUpdater, badgeUpdater, factory, repository) {

    "use strict";

    var repo = repository || new NztaRepository();
    repo.retrieveAllIncidentsResponse = notifyTile;
    var notifier = null;
    var updater = tileUpdater;
    var squareTileDecorator = squareDecorator || new LiveTileServiceDecorator(Windows.UI.Notifications.TileTemplateType.tileSquarePeekImageAndText04, new NullTileServiceDecorator(), new SquareTileNullBehaviour());
    var wideTileDecorator = wideDecorator || new LiveTileServiceDecorator(Windows.UI.Notifications.TileTemplateType.tileWidePeekImage04, squareTileDecorator, new WideTileBehaviour());
    var tileBadgeUpdater = badgeUpdater || new TileBadgeUpdater();
    var tileNotifcationFactory = factory || new TileNotificationFactory();

    var register = function() {

        var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();
        var trigger = new Windows.ApplicationModel.Background.TimeTrigger(15, false);
        builder.name = "live update";
        builder.taskEntryPoint = "Tasks\\UpdateTileTask.js";
        builder.setTrigger(trigger);
        builder.register();
    };

    function notifyTile(result) {

        for (var j = 0; j < result.length && j < 5; j++) {

            var mess = result[j].eventComments;
            
            var tile = wideTileDecorator.createTile(mess, "name", "images/ryanlerch_Warning_Sheep_Roadsign (w).png");

            var tileNotification = tileNotifcationFactory.create(tile.templateContent);
            tileNotification.expirationTime = new Date(new Date().getTime() + 60 * 13 * 1000);

            if (updater == null) {

                updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
                updater.enableNotificationQueue(true);
            }

            updater.update(tileNotification);

            if (notifier != null)
                notifier();
        }

        tileBadgeUpdater.update(result.length);
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
});

