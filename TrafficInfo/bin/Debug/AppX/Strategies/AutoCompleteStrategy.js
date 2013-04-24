var AutoCompleteStrategy = (function(textBoxAutoCompleteBehaviour) {

    "use strict";
    var self = this;

    var encodeService = new UriEncoderService();
    var geocodeRepo = new GeocodeRepository();
    var validator = new ValidatorService();
    
    this.getSourceData = function (text) {
        geocodeRepo.getCoords(encodeService.encode(text), getLatAndLong);
    };

    this.wireDataSourceToTxtBox = function() {
        textBoxAutoCompleteBehaviour.setTxtBoxDataSouce(self.getSourceData);
    };

    var getLatAndLong = function (xhr) {

        var txtBoxEl = textBoxAutoCompleteBehaviour.getTextBoxElement();

        if (validator.validate(xhr, txtBoxEl)) {

            var formattedList = mapToBindProp(xhr);
            textBoxAutoCompleteBehaviour.bind(formattedList.items);
        }
    };
    
    var mapToBindProp = function (ajr) {

        var list = JSLINQ(ajr.results);
        var formattedList = list.Select(function (i) { return { bind_prop: i.formatted_address }; });
        return formattedList;
    };
});




