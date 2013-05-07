describe("GecodeRepository", function () {
    
    it("should show error message if no internet connection", function() {

        var errorCalled = false;
        var geocodeRepoository = new GeocodeRepository();
        geocodeRepoository.onError = function() { errorCalled = true; };

        runs(function() {
            geocodeRepoository.getCoords("http://www.nonexistentsite.com", null);
        });

        waitsFor(function() {
            return errorCalled;
        });

        runs(function() {
            expect(errorCalled).toBeTruthy();
        });
    });
    
    it("should get the coordinates given a valid url and internet connection", function () {

        var resp = null;
        var geocodeRepoository = new GeocodeRepository();
        
        runs(function () {
            geocodeRepoository.getCoords("http://maps.googleapis.com/maps/api/geocode/json?address=Huron Street&sensor=false", function (res) { resp = res; });
        });

        waitsFor(function () {
            return resp != null;
        });

        runs(function () {
            expect(resp).not.toBeNull();
            expect(resp.results).not.toBeNull();
            expect(resp.results).not.toBeUndefined();
            expect(resp.results.length).toBeGreaterThan(0);
            expect(resp.results[0].formatted_address).not.toEqual("");
            expect(resp.results[0].formatted_address).not.toBeNull();
        });
    });
})

