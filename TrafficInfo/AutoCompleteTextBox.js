
//AutoCompleteTextBox MVC component

var AutoCompleteTextBox = function (txtBxId, list, onSuggestedResult, onPopupLeftClick, onPopupRightClick, onInvalidResult) {
    
    var txtBoxView = new AutoCompleteTextBoxView(txtBxId, list);
    txtBoxView.onPopupRightClick = onPopupRightClick;
    txtBoxView.onPopupLeftClick = onPopupLeftClick;
    var controller = new AutoCompleteTextBoxController(txtBoxView, onSuggestedResult, onInvalidResult);
    controller.wireDataSourceToTxtBox();
    return txtBoxView;
};

