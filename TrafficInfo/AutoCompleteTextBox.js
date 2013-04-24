var AutoCompleteTextBox = (function(elIdName,listId) {

    "use strict";
    var self = this;
    
    self.eventSpring = null;
    var htmlEl = document.getElementById(elIdName);
    
    var items = new WinJS.Binding.List([]);
    var txtBoxEl = document.getElementById(listId);
    txtBoxEl.winControl.itemDataSource = items.dataSource;

    var saveDetails = function () {
        self.clear();
        self.eventSpring(htmlEl.value);
    };

    htmlEl.onkeyup = saveDetails;

    self.bind = function (list) {
        _.each(list, function (i) {
            items.push(i);
        });
    };

    self.clear = function() {
        items.splice(0, items.length);
    };

    self.getTxtBoxEl = function() {
        return txtBoxEl;
    };
});


