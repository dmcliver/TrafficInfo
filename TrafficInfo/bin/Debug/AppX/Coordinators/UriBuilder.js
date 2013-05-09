var UriBuilder = function() {
    "use strict";

    this.build = function(uriStr) {
        return new Windows.Foundation.Uri(uriStr);
    };
}