describe("BackgroundImageUpdater", function() {

    "use strict";

    it("should change background to wellington image when map location is in wellington area", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var image = "";

        var viewMock = { setBackground: function(img) { image = img; } };

        backgroundImageUpdater.updateImage({ latitude: -41.021355, longitude: 175.286865 }, viewMock);
        expect(image).toEqual("WlgMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -39.104489, longitude: 176.253662 }, viewMock);
        expect(image).toEqual("WlgMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -38.32442, longitude: 176.000977 }, viewMock);
        expect(image).toEqual("AklSthMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -41.319076, longitude: 173.342285 }, viewMock);
        expect(image).toEqual("ChrtchrchTrffc.jpg");
    });
    
    it("should change background to dunedin image when map location is in dunedin area", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var image = "";

        var viewMock = { setBackground: function (img) { image = img; } };

        backgroundImageUpdater.updateImage({ latitude: -45.32442, longitude: 176.000977 }, viewMock);
        expect(image).toEqual("DunedinTrffc.jpg");

        backgroundImageUpdater.updateImage({ latitude: -41.319076, longitude: 173.342285 }, viewMock);
        expect(image).toEqual("ChrtchrchTrffc.jpg");
    });
    
    it("should default background to auckland image when in doubt", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var image = "";

        var viewMock = { setBackground: function (img) { image = img; } };

        backgroundImageUpdater.updateImage({ latitude: 0, longitude: 2000}, viewMock);
        expect(image).toEqual("AklSthMwy.jpg");
    });
});