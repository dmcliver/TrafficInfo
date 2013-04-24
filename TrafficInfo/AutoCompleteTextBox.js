var AutoCompleteTextBox = (function(elIdName,listId) {

    "use strict";
    var self = this;

    var saveDetails = function () {
        self.clear();
        self.eventSpring(htmlEl.value);
    };

    self.bind = function (list) {
        _.each(list, function (i) {
            items.push(i);
        });
    };

    self.clear = function() {
        items.splice(0, items.length);
    };

    var htmlEl = document.getElementById(elIdName);
    htmlEl.onkeyup = saveDetails;

    var items = new WinJS.Binding.List([]);
    document.getElementById(listId).winControl.itemDataSource = items.dataSource;
    
});


