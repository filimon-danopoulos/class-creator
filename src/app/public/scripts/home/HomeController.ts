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
        hasResult: boolean;
        JSONInput?: string;
    }

    export class HomeController extends Main.AngularController implements IHomeController {
        public static $inject = ["csharpService", "tabs"];
        constructor(private csharpService: App.Services.ICsharpService, public tabs: IHomeTab[]) {
            super();
            var initiallyActiveTab: number;
            initiallyActiveTab = 0;

            this.tabs[initiallyActiveTab].active = true;
            this.selectedTab = this.tabs[initiallyActiveTab];
            this.hasResult = false;
        }

        public selectedTab: IHomeTab;
        public JSONInput: string;
        public hasResult: boolean;

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
