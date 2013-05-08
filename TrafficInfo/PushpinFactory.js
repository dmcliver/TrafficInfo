var PushPinFactory=function() {
    "use strict";

    this.createPin = function(camera) {
        var pushPinLocation = new Microsoft.Maps.Location(camera.Lat, camera.Lon);
        var pushPin = new Microsoft.Maps.Pushpin(pushPinLocation, { icon: "images/video-icon.png", draggable: false });
        return pushPin;
    };

    this.createInfobox = function (camera) {
        var pushPinLocation = new Microsoft.Maps.Location(camera.Lat, camera.Lon);
        var htmlImageContent = "<div style='background-color:White;color:Black'><p>" + camera.Name + "</p><img src='" + camera.Url + "' /></div>";
        var infoBox = new Microsoft.Maps.Infobox(pushPinLocation, { visible: false, htmlContent: htmlImageContent });
        return infoBox;
    };
}