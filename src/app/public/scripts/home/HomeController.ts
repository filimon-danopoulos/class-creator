module App.Home {
    export interface IHomeTab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;
    }

    export interface IHomeController {
        selectedTab: IHomeTab;
        tabs: IHomeTab[];
        result: string;
        JSONInput: string;

        setSelectedTab(tab: IHomeTab): void;
        submitJSON(): void;
        hasResult(): boolean;
        reset(): void;
    }

    export class HomeController extends Main.AngularController implements IHomeController {
        public static $inject = ["csharpService", "logger", "tabs"];
        constructor(
            private csharpService: App.Services.ICsharpService,
            private logger: App.Common.ILogger,
            public tabs: IHomeTab[]
            ) {
            super();
            var initiallyActiveTab: number;
            initiallyActiveTab = 0;

            this.tabs[initiallyActiveTab].active = true;
            this.selectedTab = this.tabs[initiallyActiveTab];
        }

        public selectedTab: IHomeTab;
        public JSONInput: string;
        public result: string;

        public hasResult(): boolean {
            return !!this.result;
        }

        public setSelectedTab = (tab: IHomeTab): void => {
            this.selectedTab = tab;
            this.tabs.map(x => x.active = false);
            tab.active = true;
        }

        public submitJSON = () => {
            this.csharpService.getCodeStringFromJSON(Common.ServiceMethod.GET, this.JSONInput)
                .then(result => {
                this.result = result;
                this.logger.success("Class generated!");
            }, error => {
                    this.logger.error("Could not retrieve class with the provided JSON.");
                });
        };

        public reset(): void {
            this.result = null;
        }
    }
}
