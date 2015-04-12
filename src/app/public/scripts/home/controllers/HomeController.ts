module App.Home {
    export interface IHomeTab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;
    }

    export interface IHomeController extends Main.IController {
        selectedTab: IHomeTab;
        tabs: IHomeTab[];
        setSelectedTab(tab: IHomeTab): void;
    }

    export class HomeController implements IHomeController {
        public static $inject = ["tabs"];
        constructor( public tabs: IHomeTab[] ) {
            var initiallyActiveTab: number;
            initiallyActiveTab = 0;

            this.tabs[initiallyActiveTab].active = true;
            this.selectedTab = this.tabs[initiallyActiveTab];
        }

        public selectedTab: IHomeTab;

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularController;
        }

        public setSelectedTab(tab: IHomeTab): void {
            if (tab.disabled) {
                return;
            }
            this.selectedTab = tab;
            this.tabs.map(x => x.active = false);
            tab.active = true;
        }
    }
}
