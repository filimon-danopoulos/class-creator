/// <reference path="../common/IController.d.ts" />
/// <reference path="IHomeViewModel" />

interface IHomeController extends IController<IHomeViewModel> {
    setSelectedTab: (tab: IHomeTab) => void;
    submitJSON: () => void;
}
