///<reference path="../TrafficInfo/Repositories/NztaRepository.js"/>
///<reference path="/Scripts/jasmine/jasmine.js"/>
///<reference path="/Scripts/jasmine/jasmine-html.js"/>

describe("repository test", function() {

    var repo;
    var hasResult = false;
    var location = null;

    beforeEach(function() {
        repo = new NztaRepository();
        repo.retrievAllLocationsWithTrafficResponse = function(locations) {
            location = locations;
            hasResult = true;
        };
    });

    it("should return all locations", function() {

        runs(repo.getAllLocationsWithTraffic());

        waitsFor(function () {
            return hasResult;
        }, "Really long wait", 2000);

        runs(function() {
            expect(location).not.toBeNull();
        });
    });


});