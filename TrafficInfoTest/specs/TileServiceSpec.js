describe("TileServiceSpec", function () {
    
    it ("should not display more than five messages", function() {

        var tileNotificationDummy = new TileNotificationDummy();
        var factoryStub = new TileNotificationFactoryStub();
        factoryStub.onCreateReturn(tileNotificationDummy);

        var wideTileDecoratorMock = new WideTileDecoratorMock();
        wideTileDecoratorMock.onCreateTileReturn("<xml></xml>");

        var tileUpdaterMock = new TileUpdaterMock();
        var badgeUpdaterMock = new BadgeUpdaterMock();

        var repoMock = new Object();
        var squareDecoratorDummy = new Object();
        
        new TileService(squareDecoratorDummy, wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock, factoryStub, repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(6);

        repoMock.retrieveAllIncidentsResponse(results);

        expect(wideTileDecoratorMock.verifyCreateTileCalls(5)).toBeTruthy();
        expect(tileUpdaterMock.verify()).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdaterMock.verify()).toBeTruthy("badge update method was not called");
    });
    
    it("should not display exactly five messages", function () {

        var tileNotificationDummy = new TileNotificationDummy();
        var factoryStub = new TileNotificationFactoryStub();
        factoryStub.onCreateReturn(tileNotificationDummy);

        var wideTileDecoratorMock = new WideTileDecoratorMock();

        var tileUpdaterMock = new TileUpdaterMock();
        var badgeUpdaterMock = new BadgeUpdaterMock();

        var repoMock = new Object();
        var squareDecoratorDummy = new Object();

        new TileService(squareDecoratorDummy, wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock, factoryStub, repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(5);

        repoMock.retrieveAllIncidentsResponse(results);

        expect(wideTileDecoratorMock.verifyCreateTileCalls(5)).toBeTruthy();
        expect(tileUpdaterMock.verify()).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdaterMock.verify()).toBeTruthy("badge update method was not called");
    });
    
    it("should display exactly any number less than 5 messages", function () {

        var tileNotificationDummy = new TileNotificationDummy();
        var factoryStub = new TileNotificationFactoryStub();
        factoryStub.onCreateReturn(tileNotificationDummy);

        var wideTileDecoratorMock = new WideTileDecoratorMock();

        var tileUpdaterMock = new TileUpdaterMock();
        var badgeUpdaterMock = new BadgeUpdaterMock();

        var repoMock = new Object();
        var squareDecoratorDummy = new Object();

        new TileService(squareDecoratorDummy, wideTileDecoratorMock, tileUpdaterMock, badgeUpdaterMock, factoryStub, repoMock);

        var results = new IncidentFixtureBuilder().buildNumberOfResults(3);
        repoMock.retrieveAllIncidentsResponse(results);

        expect(wideTileDecoratorMock.verifyCreateTileCalls(5)).toBeFalsy();
        expect(tileUpdaterMock.verify()).toBeTruthy("tile notification update method was not called");
        expect(badgeUpdaterMock.verify()).toBeTruthy("badge update method was not called");
    });
});