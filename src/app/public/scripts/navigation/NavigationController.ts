module App.Navigation {

    export interface INavigationController extends Main.IController {
        isActive: (hash: string) => boolean;
    }

    export class NavigationController implements INavigationController {
        static $inject = ["$window"];
        constructor(private $window: ng.IWindowService) { }

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularController;
        }

        public isActive = (hash: string): boolean => {
            return hash === this.$window.location.hash.slice(1);
        }
    }
}
