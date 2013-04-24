var TextBoxAutoCompleteBehaviour = (function (textBox, id) {

    "use strict";

    this.getTextBoxElement = function () {
        return document.getElementById(id);
    };

    this.bind = function (items) {
        textBox.bind(items);
    };
});




