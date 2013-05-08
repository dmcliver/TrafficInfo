describe("MapBounds", function() {
    "use strict";

    it("should only return locations with bounds of New Zealand", function() {

        var isInNz = MapBounds.boundsCheck({ latitude: 45, longitude: 120 });
        expect(isInNz).toBeFalsy("first condition failed");
        
        isInNz = MapBounds.boundsCheck({ latitude: -39.740986, longitude: 161.367188 });
        expect(isInNz).toBeFalsy("second condition failed");

        isInNz = MapBounds.boundsCheck({ latitude: -57.938183, longitude: 159.301758 });
        expect(isInNz).toBeFalsy("third condition failed");

        isInNz = MapBounds.boundsCheck({ latitude: -50.708634, longitude: -151.655273 });
        expect(isInNz).toBeFalsy("fourth condition failed");

        isInNz = MapBounds.boundsCheck({ latitude: -20.797201, longitude: -179.648438 });
        expect(isInNz).toBeFalsy("fifth condition failed");

        isInNz = MapBounds.boundsCheck({ latitude: -23.241346, longitude: -137.988281 });
        expect(isInNz).toBeFalsy("sixth condition failed");
        
        isInNz = MapBounds.boundsCheck({ latitude: -47.428087, longitude: 167.651367 });
        expect(isInNz).toBeTruthy("seventh condition failed");
    });

    it("should set longitude with biggest value as east and least value to west", function () {

        var edges = MapBounds.getLongEdges(10, 12);

        expect(edges).not.toBeNull();
        expect(edges.east).toEqual(12);
        expect(edges.west).toEqual(10);
        
        edges = MapBounds.getLongEdges(7, 5);

        expect(edges).not.toBeNull();
        expect(edges.east).toEqual(7);
        expect(edges.west).toEqual(5);
    });
    
    it("should set latitude with biggest value as north and least value to south", function () {

        var edges = { east: -1, west: 0 };
        MapBounds.getLatEdges(7, 11, edges);

        expect(edges).not.toBeNull();
        expect(edges.north).toEqual(11);
        expect(edges.south).toEqual(7);
        
        edges = { east: -1, west: 0 };
        MapBounds.getLatEdges(90, 1, edges);

        expect(edges).not.toBeNull();
        expect(edges.north).toEqual(90);
        expect(edges.south).toEqual(1);
    });
});

