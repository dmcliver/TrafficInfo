var ShareCoordinator = function(randomAccessStreamReference, builder) {

    "use strict";

    this.setShareDetails = function(data, cameraDetails) {

        data.properties.title = "Traffic camera image";
        data.properties.description = "Traffic situation from selected camera: " + cameraDetails.Name;
        
        var uri = builder.build(cameraDetails.Url);
        var uriStream = randomAccessStreamReference.createFromUri(uri);

        data.setUri(uri);
        data.properties.thumbnail = uriStream;
    };
}