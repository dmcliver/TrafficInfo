var TextBoxAutoCompleteBehaviour = (function (textBox) {

    "use strict";

    this.getTextBoxElement = function () {
        return textBox.getTxtBoxEl();
    };

    this.setTxtBoxDataSouce = function(callback) {
        textBox.eventSpring = callback;
    };

    this.bind = function (items) {
        textBox.bind(items);
    };
});




