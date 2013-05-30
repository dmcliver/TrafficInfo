describe("HomePresenter", function() {

    it("should call the view to display the camera if found from event target", function () {

        var homeViewMock = new HomeViewMock.Mock();

        WinJS.Namespace.define("HomeCodeBehind", {
            showCamera: homeViewMock.showCamera
        });

        var pushpin = { lat: 44, lng: 177 };

        var camera =
            new CameraFixtureBuilder.Builder()
            .addPushpin(pushpin)
            .build();

        var e = { target: pushpin };
        var cameras = [camera];

        var presenter = new HomePresenter.Presenter();
        
        presenter.updateViewWithCameraFromTarget(e, cameras);
        
        expect(homeViewMock.assertShowCameraWasCalled()).toBeTruthy();
        expect(homeViewMock.getCameraArgumentOnShowCameraCall()).toEqual(camera);
    });

    it("should not call the view if no camera found from event target", function () {
        
        var homeViewMock = new HomeViewMock.Mock();

        WinJS.Namespace.define("HomeCodeBehind", {
            showCamera: homeViewMock.showCamera
        });
        
        var pushpin = { lat: 44, lng: 177 };

        var camera =
            new CameraFixtureBuilder.Builder()
            .addPushpin(pushpin)
            .build();

        var e = { target: null };
        var cameras = [camera];

        var presenter = new HomePresenter.Presenter();

        presenter.updateViewWithCameraFromTarget(e, cameras);

        expect(homeViewMock.assertShowCameraWasCalled()).toBeFalsy();
        expect(homeViewMock.getCameraArgumentOnShowCameraCall()).not.toEqual(camera);
    });
});

