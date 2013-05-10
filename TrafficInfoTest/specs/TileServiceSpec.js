describe("TileServiceSpec", function () {
    
    it ("should not display more than five messages", function() {

        var createCalls = 0;
        var tileUpdateWasCalled = false;
        var badgeUpdateWasCalled = false;

        var tileNotificationMock = {};
        var factoryStub = { create: function(template) { return tileNotificationMock; } };

        var wideTileDecoratorMock = { createTile: function (mess, prop, img) { createCalls++; return {templateContent:"<xml></xml>"}; }};

        var tileUpdaterMock = { update: function (obj) { tileUpdateWasCalled = true; }};
        var badgeUpdaterMock = { update: function (obj) { badgeUpdateWasCalled = true; } };

        var repoMock = new Object();
        var squareDecorator = new Object();
        
        var tileService = new TileService(squareDecorator,wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock,factoryStub,repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(6);

        repoMock.retrieveAllIncidentsResponse(results);

        expect(createCalls).toEqual(5);
        expect(tileUpdateWasCalled).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdateWasCalled).toBeTruthy("badge update method was not called");
    });
    
    it("should not display exactly five messages", function () {

        var createCalls = 0;
        var tileUpdateWasCalled = false;
        var badgeUpdateWasCalled = false;

        var tileNotificationMock = {};
        var factoryStub = { create: function (template) { return tileNotificationMock; } };

        var wideTileDecoratorMock = { createTile: function (mess, prop, img) { createCalls++; return { templateContent: "<xml></xml>" }; } };

        var tileUpdaterMock = { update: function (obj) { tileUpdateWasCalled = true; } };
        var badgeUpdaterMock = { update: function (obj) { badgeUpdateWasCalled = true; } };

        var repoMock = new Object();
        var squareDecorator = new Object();

        var tileService = new TileService(squareDecorator, wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock, factoryStub, repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(5);

        repoMock.retrieveAllIncidentsResponse(results);

        expect(createCalls).toEqual(5);
        expect(tileUpdateWasCalled).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdateWasCalled).toBeTruthy("badge update method was not called");
    });
    
    it("should display exactly any number less than 5 messages", function () {

        var createCalls = 0;
        var tileUpdateWasCalled = false;
        var badgeUpdateWasCalled = false;

        var tileNotificationMock = {};
        var factoryStub = { create: function (template) { return tileNotificationMock; } };

        var wideTileDecoratorMock = { createTile: function (mess, prop, img) { createCalls++; return { templateContent: "<xml></xml>" }; } };

        var tileUpdaterMock = { update: function (obj) { tileUpdateWasCalled = true; } };
        var badgeUpdaterMock = { update: function (obj) { badgeUpdateWasCalled = true; } };

        var repoMock = new Object();
        var squareDecorator = new Object();

        var tileService = new TileService(squareDecorator, wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock, factoryStub, repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(3);

        repoMock.retrieveAllIncidentsResponse(results);

        expect(createCalls).toEqual(3);
        expect(tileUpdateWasCalled).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdateWasCalled).toBeTruthy("badge update method was not called");
    });
});