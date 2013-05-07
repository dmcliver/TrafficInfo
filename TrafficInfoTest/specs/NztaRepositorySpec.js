
describe("NztaRepository", function() {
    it("should show message dialog box if no connection when retrieving camera info", function() {

        var errorCalled = false;

        var repo = new NztaRepository("http://www.nonexistencesite.com");
        repo.onError = function () { errorCalled = true; };
        
        runs(function() {
            repo.retrieveAllCameras();
        });

        waitsFor(function() {
            return errorCalled;
        });

        runs(function() {
            expect(errorCalled).toBeTruthy();
        });
    });

    it("should show message dialog box if no connection when retrieving incident info",function() {
        
        var errorCalled = false;

        var repo = new NztaRepository(null,"http://www.nonexistencesite.com");
        repo.onError = function () { errorCalled = true; };
        
        runs(function () {
            repo.retrieveAllIncidents();
        });

        waitsFor(function () {
            return errorCalled;
        });

        runs(function () {
            expect(errorCalled).toBeTruthy();
        });
    });

    it("should retrieve camera info with internet connection", function() {
        var result = null;

        var repo = new NztaRepository();
        repo.retrieveAllCamerasResponse = function (res) { result = res; };

        runs(function() {
            repo.retrieveAllCameras();
        });

        waitsFor(function() {
            return result != null;
        });

        runs(function() {
            expect(result).not.toBeNull();
            expect(result.length).toBeGreaterThan(0);
        });
    });
    
    it("should retrieve incident info with internet connection", function () {
        var result = null;

        var repo = new NztaRepository();
        repo.retrieveAllIncidentsResponse = function (res) { result = res; };
        
        runs(function () {
            repo.retrieveAllIncidents();
        });

        waitsFor(function () {
            return result != null;
        });

        runs(function () {
            expect(result).not.toBeNull();
        });
    });
});