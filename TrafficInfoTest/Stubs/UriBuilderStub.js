var UriBuilderStub = function() {
    "use strict";

    var uri;

    this.onBuildReturn = function(uriStr) {
        uri = uriStr;
    };

    this.build = function(uriStr) {
        return uri;
    };
}