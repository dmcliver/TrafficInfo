var RandomAccessReferenceStub = function() {
    "use strict";

    var uri;

    this.onCreateFromUriReturn = function(uriStr) {
        uri = uriStr;
    };

    this.createFromUri = function(uriStr) {
        return uri;
    };
};