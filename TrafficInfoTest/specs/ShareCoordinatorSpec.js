describe("ShareCoordinator", function () {
    
    it("should set camera uri and name for data transfer manager event", function() {
        var randomAccessReferenceStub = { createFromUri: function(uriStr) { return uriStr; } };
        var uriBuilderStub = { build: function (uriStr) { return uriStr; } };
        
        var shareCoordinator = new ShareCoordinator(randomAccessReferenceStub,uriBuilderStub);

        this.uri = null;
        var self = this;

        var data = { setUri: function (u) { self.uri = u; }};
        data.properties = { title: "", description: "", thumbnail: null };

        shareCoordinator.setShareDetails(data, { Url: "www.blach.com", Name: "Penrose - Station Rd" });

        expect(data.properties.title).toEqual("Traffic camera image");
        expect(data.properties.description).toEqual("Traffic situation from selected camera: " + "Penrose - Station Rd");
        expect(this.uri).not.toBeNull("Uri should not be null");
        expect(data.properties.thumbnail).not.toBeNull("Thumbnail should not be null");
        expect(this.uri).toEqual("www.blach.com");
        expect(data.properties.thumbnail).toEqual("www.blach.com");
    });
});

