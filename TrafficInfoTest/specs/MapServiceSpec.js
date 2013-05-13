
describe("MapService", function () {

    it("should clear all pushpin & infobox entities associated with map & refresh traffic", function () {
        
        var trafficManagerMock = new TrafficManagerMock();

        var mapViewMock = new MapViewMock();
        mapViewMock.stubEntities([new Microsoft.Maps.Pushpin(), new Microsoft.Maps.Infobox(), {desc: "This is a fake obj"}, null, undefined]);
        mapViewMock.onGetLengthReturn(2);

        var mapService = new MapService(null, mapViewMock, trafficManagerMock);
        mapService.clearMap();

        expect(mapViewMock.removeCalls()).toEqual(2);
        expect(trafficManagerMock.getCallsOnShow()).toEqual(1);
        expect(trafficManagerMock.getCallsOnIncidents()).toEqual(1);
        expect(trafficManagerMock.getCallsOnFlow()).toEqual(1);
    });

    it("should create a push pin for each camera object", function () {

        var factoryStub = createFactoryStub();

        var mapViewMock = new MapViewMock();
        mapViewMock.stubEntities([]);

        var cams = [{ Url: "Blah", Name:"One" }, { Url: "Nah", Name:"Two" }, { Url: "Tah",Name:"Three" }];

        var mapService = new MapService(factoryStub, mapViewMock);
        var cameraInfos = mapService.setMapWithCameras(cams, null);
        
        expect(mapViewMock.entityCount()).toEqual(6);
        expect(cameraInfos.length).toEqual(3);
        
        expect(cameraInfos[0].CameraName).toEqual("One");
        expect(cameraInfos[1].CameraName).toEqual("Two");
        expect(cameraInfos[2].CameraName).toEqual("Three");
        
        expect(cameraInfos[0].CameraUri).toEqual("Blah");
        expect(cameraInfos[1].CameraUri).toEqual("Nah");
        expect(cameraInfos[2].CameraUri).toEqual("Tah");
    });
    
    it("should not create push pins for a non set of camera data", function () {
        
        var factoryStub = createFactoryStub();

        var mapViewMock = new MapViewMock();
        mapViewMock.stubEntities([]);

        var cams = [];

        var mapService = new MapService(factoryStub, mapViewMock);
        var cameraInfos = mapService.setMapWithCameras(cams, null);

        expect(mapViewMock.entityCount()).toEqual(0);
        expect(cameraInfos.length).toEqual(0);
    });
    
    it("should not create push pins for a set of null camera data", function () {

        var factoryStub = createFactoryStub();

        var mapViewMock = new MapViewMock();
        mapViewMock.stubEntities([]);

        var cams = null;

        var mapService = new MapService(factoryStub, mapViewMock);
        var cameraInfos = mapService.setMapWithCameras(cams, null);

        expect(mapViewMock.entityCount()).toEqual(0);
        expect(cameraInfos.length).toEqual(0);
    });
    
    function createFactoryStub() {
        
        var factoryStub = new PushpinFactoryStub();
        factoryStub.onCreateInfoboxReturn(2);
        factoryStub.onCreatePinReturn(1);
        return factoryStub;
    }
});

