(function () {
    "use strict";

    var backgroundTaskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current;

    function doWork() {

        var key = null, settings = Windows.Storage.ApplicationData.current.localSettings;

        new TileService().UpdateTile(onDone);

        key = backgroundTaskInstance.task.taskId.toString();
        settings.values[key] = "Succeeded";
    }

    function onDone() {
        close();
    }

    doWork();

})();

