var AutoCompleteStrategy = (function(txtBox,onSuggestedResult, clearValidation) {

    "use strict";
    var self = this;

    var encodeService = new UriEncoderService();
    var geocodeRepo = new GeocodeRepository();
    var validator = new ValidatorService();
    var called;

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
        var formattedList = list.Select(function (i) { return { bind_prop: i.formatted_address, location: { latitude: i.geometry.location.lat, longitude: i.geometry.location.lng } }; });

        return JSLINQ(formattedList.items).Where(function(itm) {

            return MapBounds.boundsCheck(itm.location);
        }).Distinct(function (i) {
            
            return i.bind_prop;
        });;
    };
});




