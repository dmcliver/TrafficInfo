var IncidentFixtureBuilder = function() {
    "use strict";

    this.buildNumberOfResults = function(num) {
        var eventComment = "eventComment";

        var results = [];

        for (var i = 0; i < num; i++) {
            results.push({ eventComments: eventComment + i });
        }
        return results;
    };
}