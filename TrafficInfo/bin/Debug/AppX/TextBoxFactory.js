var TextBoxFactory = function() {

    this.createTextBox = function(txtBxId, list, onSuggestedResult, onPopupLeftClick, onPopupRightClick, onInvalidResult) {

        var txtBox = new AutoCompleteTextBox(txtBxId, list);
        txtBox.onPopupRightClick = onPopupRightClick;
        txtBox.onPopupLeftClick = onPopupLeftClick;
        var locAutoCompleteStrategy = new AutoCompleteStrategy(txtBox, onSuggestedResult, onInvalidResult);
        locAutoCompleteStrategy.wireDataSourceToTxtBox();
        return txtBox;
    };
};

