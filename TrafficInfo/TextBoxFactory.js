var TextBoxFactory = function() {


    this.createTextBox = function(txtBxId, list) {

        var txtBox = new AutoCompleteTextBox(txtBxId, list);
        var locAutoCompleteStrategy = new AutoCompleteStrategy(new TextBoxAutoCompleteBehaviour(txtBox));
        locAutoCompleteStrategy.wireDataSourceToTxtBox();
        return txtBox;
    };
};

