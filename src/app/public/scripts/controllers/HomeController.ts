/// <reference path="../Main.ts" />

module App.Controller {

    interface IHomeScope {
        selectedTab: ITab;
        tabs: ITab[];
        JSONInput: string;
        setSelectedTab: (tab: any) => void;
        submitJSON: () => void;
    }

    export class HomeController implements IHomeScope {
        constructor(csharpService) {
            console.log(csharpService.test());
            this.init();
        }
        
        public selectedTab: ITab;
        public JSONInput;
        public tabs: ITab[];

        public setSelectedTab = (tab: any): void => {
            this.selectedTab = tab;
            this.tabs.map(x => x.active = false); 
            tab.active = true;
        }

        public submitJSON = () => {
            alert(this.JSONInput);  
        };

        private init() {
            var initiallyActiveTab = 0;

            this.tabs  = [{
                title: "Define JSON",
                description: "Provide your own JSON", 
                partial: "views/Home/JSONForm.html"
            }, {
                title: "Simple URL",
                description: "Point the app to an URL that represents a JSON endpoint.",
                partial: "views/Home/SimpleURLForm.html"
            }];

            this.selectedTab = this.tabs[initiallyActiveTab];
            this.tabs[initiallyActiveTab].active = true;
        }
    }        

    interface ITab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;    
    }
} 
