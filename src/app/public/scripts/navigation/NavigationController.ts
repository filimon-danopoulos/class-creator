/// <reference path="../Main.ts" />
/// <reference path="./INavigationController.d.ts" />

module App.Controller {

    export class NavigationController implements INavigationController {
        constructor($window: ng.IWindowService) {
            this.window = $window;
        }
        public isActive = (hash: string): boolean => {
            return hash === this.window.location.hash.slice(1);
        }
        
        private window: ng.IWindowService;
    }       
} 
