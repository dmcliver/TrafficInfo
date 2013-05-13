var WideTileDecoratorMock = function() {
    "use strict";

    var createTileCalls = 0;

    var content = "";

    this.onCreateTileReturn = function(xmlContent) {
        content = xmlContent;
    };

    this.createTile = function(mess, prop, img) {
        createTileCalls++;
        return content;
    };

    this.verifyCreateTileCalls = function(numOfCalls) {
        return createTileCalls == numOfCalls;
    };
};