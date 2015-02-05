/// <reference path="./IHomeController.d.ts" />
/// <rerefence path="../services/ICsharpService.ts" />

module App.Controller {
    export class HomeController implements IHomeController {
        /* @ngInject */
        constructor(private csharpService: App.Service.ICsharpService, private homeTabFactory) {
            this.init();
        }
        
        public vm: IHomeViewModel;

        public setSelectedTab = (tab: IHomeTab): void => {
            this.vm.selectedTab = tab;
            this.vm.tabs.map(x => x.active = false); 
            tab.active = true;
        }

        public submitJSON = () => {
            alert(this.vm.JSONInput);  
        };
        
        private init() {
            var initiallyActiveTab = 0; 
            var tabs: IHomeTab[] = this.homeTabFactory.createHomeTabs();
            tabs[initiallyActiveTab].active = true;
            this.vm = {
                tabs: tabs,
                selectedTab: tabs[initiallyActiveTab] 
            };
        }
    }        
} 
