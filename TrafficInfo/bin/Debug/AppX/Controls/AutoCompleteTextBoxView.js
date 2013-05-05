var AutoCompleteTextBoxView = (function(elIdName,listId) {

    "use strict";
    var self = this;
    
    self.eventSpring = null;
    var htmlEl = document.getElementById(elIdName);
    
    var items = new WinJS.Binding.List([]);
    var txtBoxEl = document.getElementById(listId);

    txtBoxEl.winControl.itemDataSource = items.dataSource;
    
    txtBoxEl.addEventListener("iteminvoked", firePopupLeftClick);
    txtBoxEl.addEventListener("selectionchanged", firePopupRightClick);

    function firePopupLeftClick(evt) {
        
        if (self.onPopupLeftClick != null) {
            
            var index = evt.detail.itemIndex;
            var item = items.getItem(index).data;
            self.onPopupLeftClick(item);
        }
    }

    function firePopupRightClick(evt) {
        
        if (self.onPopupRightClick != null) {
            
            txtBoxEl.winControl.selection.getItems().done(
                
                function complete(res) {
                    
                    if(res.length > 0)
                        self.onPopupRightClick(res[0].data);
                },
                function error(res) {
                    // swallow it, big & hard!!!
                }
            );
        }
    }

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

    self.onPopupLeftClick = null;
    self.onPopupRightClick = null;
});


