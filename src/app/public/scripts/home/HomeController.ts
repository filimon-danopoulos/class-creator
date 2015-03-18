/// <rerefence path="../services/ICsharpService" />

module App.Home {
    export interface IHomeTab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;    
    }

    export interface IHomeController {
        setSelectedTab: (tab: IHomeTab) => void;
        submitJSON: () => void;
        selectedTab: IHomeTab;
        tabs: IHomeTab[];
        JSONInput?: string;
    }

    export class HomeController extends Main.AngularController implements IHomeController {
        static $inject = ["csharpService", "homeTabFactory"];
        constructor(private csharpService: App.Services.ICsharpService, private homeTabFactory) {
            super();

            var initiallyActiveTab: number,
                tabs: IHomeTab[];
            
            initiallyActiveTab = 0; 
            tabs = this.homeTabFactory.createHomeTabs();

            tabs[initiallyActiveTab].active = true;
            this.tabs = tabs;
            this.selectedTab = tabs[initiallyActiveTab];
        }
        
        public selectedTab: IHomeTab;
        public tabs: IHomeTab[];
        public JSONInput: string;

        public setSelectedTab = (tab: IHomeTab): void => {
            this.selectedTab = tab;
            this.tabs.map(x => x.active = false); 
            tab.active = true;
        }

        public submitJSON = () => {
            alert(this.JSONInput);  
        };
    }        
} 
