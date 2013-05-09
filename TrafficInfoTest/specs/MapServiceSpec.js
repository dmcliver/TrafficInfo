
describe("MapService", function () {

    it("should clear all pushpin & infobox entities associated with map & refresh traffic", function () {
        
        var thisMap = {};

        var showCalls = 0;
        var incidentCalls = 0;
        var flowCalls = 0;
        var removeCalls = 0;

        var length = 2;

        var trafficManager = {
            show: function () { showCalls++; },
            showIncidents: function () { incidentCalls++; },
            showFlow: function () { return flowCalls++; }
        };

        thisMap.entities = [new Microsoft.Maps.Pushpin(), new Microsoft.Maps.Infobox(), {desc: "This is a fake obj"}, null, undefined];
        thisMap.entities.getLength = function () { return length; };
        thisMap.entities.remove = function (entity) { removeCalls++; };
        var mapService = new MapService(null, thisMap, trafficManager);
        mapService.clearMap();

        expect(removeCalls).toEqual(length);
        expect(showCalls).toEqual(1);
        expect(incidentCalls).toEqual(1);
        expect(flowCalls).toEqual(1);
    });

    it("should create a push pin for each camera object", function () {
        var factory = {
            createPin: function (c) { return 1; },
            createInfobox: function (c) { return 2; }
        };

        var map = {};
        map.entities = [];

        var cams = [{ Url: "Blah", Name:"One" }, { Url: "Nah", Name:"Two" }, { Url: "Tah",Name:"Three" }];

        var mapService = new MapService(factory, map);
        var cameraInfos = mapService.setMapWithCameras(cams, null);
        
        expect(map.entities.length).toEqual(6);
        expect(cameraInfos.length).toEqual(3);
        
        expect(cameraInfos[0].CameraName).toEqual("One");
        expect(cameraInfos[1].CameraName).toEqual("Two");
        expect(cameraInfos[2].CameraName).toEqual("Three");
        
        expect(cameraInfos[0].CameraUri).toEqual("Blah");
        expect(cameraInfos[1].CameraUri).toEqual("Nah");
        expect(cameraInfos[2].CameraUri).toEqual("Tah");
    });
    
    it("should not create push pins for a non set of camera data", function () {
        var factory = {
            createPin: function (c) { return 1; },
            createInfobox: function (c) { return 2; }
        };

        var map = {};
        map.entities = [];

        var cams = [];

        var mapService = new MapService(factory, map);
        var cameraInfos = mapService.setMapWithCameras(cams, null);

        expect(map.entities.length).toEqual(0);
        expect(cameraInfos.length).toEqual(0);
    });
    
    it("should not create push pins for a set of null camera data", function () {
        var factory = {
            createPin: function (c) { return 1; },
            createInfobox: function (c) { return 2; }
        };

        var map = {};
        map.entities = [];

        var cams = null;

        var mapService = new MapService(factory, map);
        var cameraInfos = mapService.setMapWithCameras(cams, null);

        expect(map.entities.length).toEqual(0);
        expect(cameraInfos.length).toEqual(0);
    });
});

