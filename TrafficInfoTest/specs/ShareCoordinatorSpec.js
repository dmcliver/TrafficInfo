describe("ShareCoordinator", function () {
    
    it("should set camera uri and name for data transfer manager event", function () {

        var uri = "http://www.thisisntawebsite.com";
        var cameraName = "Penrose - Station Rd";
        
        var randomAccessReferenceStub = new RandomAccessReferenceStub();
        randomAccessReferenceStub.onCreateFromUriReturn(uri);

        var uriBuilderStub = new UriBuilderStub();
        uriBuilderStub.onBuildReturn(uri);

        var dataProperties = new DataPropertiesFixture("", "", null);

        var dataMock = new RequestDataMock();
        dataMock.stubProperties(dataProperties);
        
        var shareCoordinator = new ShareCoordinator(randomAccessReferenceStub,uriBuilderStub);
        shareCoordinator.setShareDetails(dataMock, { Url: uri, Name: cameraName });

        expect(dataProperties.title).toEqual("Traffic camera image");
        expect(dataProperties.description).toEqual("Traffic situation from selected camera: " + cameraName);
        expect(dataMock.getArgForSetUri()).not.toBeNull("Uri should not be null");
        expect(dataProperties.thumbnail).not.toBeNull("Thumbnail should not be null");
        expect(dataMock.getArgForSetUri()).toEqual(uri);
        expect(dataProperties.thumbnail).toEqual(uri);
    });
});

