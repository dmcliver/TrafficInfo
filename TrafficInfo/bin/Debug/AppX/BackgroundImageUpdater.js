var BackgroundImageUpdater = function() {
    "use strict";
    
    this.updateImage = function(location, view) {

        if (location.latitude <= -38.891033 && location.latitude >= -41.61 && !(location.longitude <= 174.22191 && location.latitude <= -40.822124)) {
            return view.setBackground("WlgMwy.jpg");
        }
        else if (location.longitude <= 174.22191 && location.latitude <= -40.822124 && location.latitude > -45.042478) {
            return view.setBackground("ChrtchrchTrffc.jpg");
        }
        else if (location.latitude <= -45.042478) {
            return view.setBackground("DunedinTrffc.jpg");
        }
        return view.setBackground("AklSthMwy.jpg");
    };
}