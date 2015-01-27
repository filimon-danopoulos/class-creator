/// <reference path="../Main.ts" />

module App.Controller {
    export class NavigationController {
        constructor($scope) {
            $scope.isActive = this.isActive;
        }
        private isActive(hash: string) : boolean {
            return hash === window.location.hash.slice(1);
        }
    }        
} 

App.registerController("NavigationController", ["$scope"]);
