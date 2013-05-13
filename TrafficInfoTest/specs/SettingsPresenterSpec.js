describe("SettingsPresenter", function () {
    
    it("should set options with value from repository", function () {

        var refreshSetting = 42;

        var settingsViewMock = new SettingsViewMock();
        settingsViewMock.onRefreshRateIndexFromValueReturn(refreshSetting, 99);

        var repoStub = new RoamingSettingsRepositoryStub();
        repoStub.onRetrieveRefreshRateReturn(refreshSetting);

        var settingsPresenter = new SettingsPresenter(settingsViewMock, repoStub);
        settingsPresenter.setRefreshRateWithSettings();

        var indexForSelectedRate = settingsViewMock.getArgsOnIndexForSelectedRate();
        expect(indexForSelectedRate).toEqual(99);
    });
    
    it("should set not with value from repository when settings undefined", function () {

        var settingsViewMock = new SettingsViewMock();
        settingsViewMock.onRefreshRateIndexFromValueReturn(undefined, 99);

        var repoStub = new RoamingSettingsRepositoryStub();
        repoStub.onRetrieveRefreshRateReturn(undefined);

        var settingsPresenter = new SettingsPresenter(settingsViewMock, repoStub);
        settingsPresenter.setRefreshRateWithSettings();

        var indexForSelectedRate = settingsViewMock.getArgsOnIndexForSelectedRate();
        expect(indexForSelectedRate).toEqual(undefined);
    });
    
    it("should set not with value from repository when settings null", function () {

        var settingsViewMock = new SettingsViewMock();
        settingsViewMock.onRefreshRateIndexFromValueReturn(null, 99);

        var repoStub = new RoamingSettingsRepositoryStub();
        repoStub.onRetrieveRefreshRateReturn(null);

        var settingsPresenter = new SettingsPresenter(settingsViewMock, repoStub);
        settingsPresenter.setRefreshRateWithSettings();

        var indexForSelectedRate = settingsViewMock.getArgsOnIndexForSelectedRate();
        expect(indexForSelectedRate).toEqual(undefined);
    });
});