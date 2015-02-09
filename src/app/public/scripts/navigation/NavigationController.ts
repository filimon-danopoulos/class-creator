/// <reference path="./INavigationController" />
/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />

module App.Controller {
    export class NavigationController implements INavigationController {
        static $inject = ["$window"];
        constructor(private $window: ng.IWindowService) { }

        public isActive = (hash: string): boolean => {
            return hash === this.$window.location.hash.slice(1);
        }
    }       
} 
