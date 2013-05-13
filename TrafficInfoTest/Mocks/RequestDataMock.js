var RequestDataMock = function() {
    "use strict";

    var setUriArg = "";
    var self = this;
    
    this.stubProperties = function(props) {
        self.properties = props;
    };

    this.properties = {};

    this.setUri = function(uriStr) {
        setUriArg = uriStr;
    };

    this.getArgForSetUri = function() {
        return setUriArg;
    };
}