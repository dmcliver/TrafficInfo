var MapViewMock = function() {
    "use strict";

    var img;
    this.entities = [];
    var l;
    var removeCallCount = 0;
    
    var remove = function() {
        removeCallCount++;
    };

    this.getArgsOnSetBackground = function() {
        return img;
    };

    this.setBackground = function(image) {
        img = image;
    };

    this.stubEntities = function (e) {
        
        this.entities = e;
        this.entities.getLength = getLength;
        this.entities.remove = remove;
    };

    this.onGetLengthReturn = function(len) {
        l = len;
    };

    var getLength = function () {
        return l;
    };

    this.removeCalls = function() {
        return removeCallCount;
    };

    this.entityCount = function() {
        return this.entities.length;
    };
}