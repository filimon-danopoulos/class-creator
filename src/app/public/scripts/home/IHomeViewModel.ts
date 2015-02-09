/// <reference path="./IHomeTab" />

module App.Data {
    export interface IHomeViewModel {
        selectedTab: IHomeTab;
        tabs: IHomeTab[];
        JSONInput?: string;
    }
}
