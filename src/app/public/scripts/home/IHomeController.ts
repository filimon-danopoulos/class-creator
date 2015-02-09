/// <reference path="../common/IController" />
/// <reference path="IHomeViewModel" />

module App.Controller {
    export interface IHomeController extends IController<App.Data.IHomeViewModel> {
        setSelectedTab: (tab: App.Data.IHomeTab) => void;
        submitJSON: () => void;
    }
}
