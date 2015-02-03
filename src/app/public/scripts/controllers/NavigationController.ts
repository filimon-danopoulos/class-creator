/// <reference path="../Main.ts" />

module App.Controller {
    interface INavigationScope {
        isActive: (hash: string) => boolean;    
    }

    export class NavigationController {
        constructor($window: ng.IWindowService) {
            this.window = $window;
        }
        public isActive = (hash: string): boolean => {
            return hash === this.window.location.hash.slice(1);
        }
        
        private window: ng.IWindowService;
    }       
} 
