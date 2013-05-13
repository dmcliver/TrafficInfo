describe("BackgroundImageUpdater", function() {

    "use strict";

    it("should change background to wellington image when map location is in wellington area", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var mapViewMock = new MapViewMock();

        backgroundImageUpdater.updateImage({ latitude: -41.021355, longitude: 175.286865 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("WlgMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -39.104489, longitude: 176.253662 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("WlgMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -38.32442, longitude: 176.000977 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("AklSthMwy.jpg");
        
        backgroundImageUpdater.updateImage({ latitude: -41.319076, longitude: 173.342285 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("ChrtchrchTrffc.jpg");
    });
    
    it("should change background to dunedin image when map location is in dunedin area", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var mapViewMock = new MapViewMock();

        backgroundImageUpdater.updateImage({ latitude: -45.32442, longitude: 176.000977 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("DunedinTrffc.jpg");

        backgroundImageUpdater.updateImage({ latitude: -41.319076, longitude: 173.342285 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("ChrtchrchTrffc.jpg");
    });
    
    it("should default background to auckland image when in doubt", function () {

        var backgroundImageUpdater = new BackgroundImageUpdater();

        var mapViewMock = new MapViewMock();

        backgroundImageUpdater.updateImage({ latitude: 0, longitude: 2000 }, mapViewMock);
        expect(mapViewMock.getArgsOnSetBackground()).toEqual("AklSthMwy.jpg");
    });
});