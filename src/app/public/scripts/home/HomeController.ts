/// <reference path="./IHomeController" />
/// <rerefence path="../services/ICsharpService" />

module App.Controller {
    export class HomeController implements App.Controller.IHomeController {
        static $inject = ["csharpService", "homeTabFactory"];
        constructor(private csharpService: App.Service.ICsharpService, private homeTabFactory) {
            this.init();
        }
        
        public vm: App.Data.IHomeViewModel;

        public setSelectedTab = (tab: App.Data.IHomeTab): void => {
            this.vm.selectedTab = tab;
            this.vm.tabs.map(x => x.active = false); 
            tab.active = true;
        }

        public submitJSON = () => {
            alert(this.vm.JSONInput);  
        };
        
        private init() {
            var initiallyActiveTab = 0; 
            var tabs: App.Data.IHomeTab[] = this.homeTabFactory.createHomeTabs();
            tabs[initiallyActiveTab].active = true;
            this.vm = {
                tabs: tabs,
                selectedTab: tabs[initiallyActiveTab] 
            };
        }
    }        
} 
