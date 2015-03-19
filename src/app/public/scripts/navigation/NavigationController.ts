module App.Navigation {

    export interface INavigationController {
        isActive: (hash: string) => boolean;
    }

    export class NavigationController extends Main.AngularController implements INavigationController {
        static $inject = ["$window"];
        constructor(private $window: ng.IWindowService) {
            super();
        }

        public isActive = (hash: string): boolean => {
            return hash === this.$window.location.hash.slice(1);
        }
    }
}
