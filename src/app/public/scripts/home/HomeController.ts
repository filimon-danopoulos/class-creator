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
        static $inject = ["csharpService", "tabs"];
        constructor(private csharpService: App.Services.ICsharpService, public tabs: IHomeTab[]) {
            super();

            var initiallyActiveTab: number;

            initiallyActiveTab = 0;

            tabs[initiallyActiveTab].active = true;
            this.selectedTab = this.tabs[initiallyActiveTab];
        }

        public selectedTab: IHomeTab;
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
