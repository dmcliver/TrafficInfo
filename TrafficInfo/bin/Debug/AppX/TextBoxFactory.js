var TextBoxFactory = function() {


    this.createTextBox = function(txtBxId, list, onSuggestedResult, onPopupLeftClick, onPopupRightClick) {

        var txtBox = new AutoCompleteTextBox(txtBxId, list);
        txtBox.onPopupRightClick = onPopupRightClick;
        txtBox.onPopupLeftClick = onPopupLeftClick;
        var locAutoCompleteStrategy = new AutoCompleteStrategy(new TextBoxAutoCompleteBehaviour(txtBox), onSuggestedResult);
        locAutoCompleteStrategy.wireDataSourceToTxtBox();
        return txtBox;
    };
};

