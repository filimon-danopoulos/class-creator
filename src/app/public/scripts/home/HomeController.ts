/// <reference path="../Main.ts" />
/// <reference path="./IHomeController.d.ts" />

module App.Controller {
    export class HomeController implements IHomeController {
        constructor(csharpService) {
            console.log(csharpService.test());
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
            var tabs: IHomeTab[] = [{
                title: "Define JSON",
                description: "Provide your own JSON", 
                partial: "views/home/JSONForm.html"
            }, {
                title: "Simple URL",
                description: "Point the app to an URL that represents a JSON endpoint.",
                partial: "views/home/SimpleURLForm.html"
            }];
            tabs[initiallyActiveTab].active = true;
            this.vm = {
                tabs: tabs,
                selectedTab: tabs[initiallyActiveTab] 
            };
        }
    }        


} 
