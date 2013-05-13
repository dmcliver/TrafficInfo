var SettingsViewMock = function() {
    "use strict";

    var index;
    var returnedIndex;
    var value_;
    this.onRefreshRateIndexFromValueReturn = function (val, idx) {
        value_ = val;
        index = idx;
    };

    this.getRefreshRateIndexFromValue = function (value) {
        if (value == value_) {
            return index;
        }
        return -1;
    };

    this.setSelectedRateIndex = function(idx) {
        returnedIndex = idx;
    };

    this.getArgsOnIndexForSelectedRate = function () {
        return returnedIndex;
    };
}