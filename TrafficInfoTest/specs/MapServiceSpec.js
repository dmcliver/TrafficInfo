
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
        var mapService = new MapService(thisMap, trafficManager);
        mapService.clearMap();

        expect(removeCalls).toEqual(length);
        expect(showCalls).toEqual(1);
        expect(incidentCalls).toEqual(1);
        expect(flowCalls).toEqual(1);
    });
});

