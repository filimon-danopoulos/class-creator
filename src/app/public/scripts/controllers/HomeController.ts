/// <reference path="../Main.ts" />

module App.Controller {
    interface ITab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;    
    }
    export class HomeController {
        constructor($scope) {
            this.scope = $scope;
            this.scope.tabs = this.tabs;
            $scope.selectedTab = this.tabs[0];
            $scope.setSelectedTab = this.setSelectedTab;
        }

        private scope;
        
        private tabs: ITab[] = [{
            title: "Simple URL",
            description: "Point the app to an URL that represents a JSON endpoint.",
            partial: "views/Home/SimpleURLForm.html",
            active: true
        }, {
            title: "Define JSON",
            description: "Provide your own JSON", 
            partial: "views/Home/JSONForm.html"
        }];

        private setSelectedTab = (tab: any): void => {
            this.scope.selectedTab = tab;
            this.tabs.map(x => x.active = false); 
            tab.active = true;
        }
    }        
} 
