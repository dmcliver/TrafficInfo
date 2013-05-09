var AutoCompleteTextBoxController = (function(txtBox,onSuggestedResult, clearValidation,repo) {

    "use strict";
    var self = this;

    var encodeService = new UriEncoderService();
    var geocodeRepo = repo || new GeocodeRepository();
    geocodeRepo.onError = displayError;
    
    var validator = new ValidatorService();
    var called;

    function displayError() {
        var msg = new Windows.UI.Popups.MessageDialog("No internet connection has been found.");
        msg.showAsync();
    }

    this.getSourceData = function (text) {
        called = false;
        geocodeRepo.getCoords(encodeService.encode(text), getLatAndLong);
    };

    this.wireDataSourceToTxtBox = function() {
        txtBox.eventSpring = self.getSourceData;
    };

    var getLatAndLong = function (xhr) {

        if (called)
            return;

        var txtBoxEl = txtBox.getTxtBoxEl();

        clearValidation();

        if (validator.validate(xhr, txtBoxEl)) {

            var formattedList = mapToBindProp(xhr);

            if (formattedList.items.length >= 1)
                txtBox.bind(formattedList.items);
        }
        called = true;
    };
    
    var mapToBindProp = function (ajr) {

        var list = JSLINQ(ajr.results);
        
        var formattedList = list.Select(function (i) {
            return new AutoCompleteTextBoxModel(i.formatted_address, i.geometry.location.lat, i.geometry.location.lng);
        });

        return JSLINQ(formattedList.items)
        .Where(function (itm) {
            return MapBounds.boundsCheck(itm.location);
        }).Distinct(function (i) {
            return i.bind_prop;
        });;
    };
});




