/// <reference path="../Main.ts" />

module App.Controller {
    export class NavigationController {
        constructor($scope, $window) {
            this.scope = $scope;
            this.window = $window;

            $scope.isActive = this.isActive;
        }
                
        private scope;
        
        private window;

        private isActive = (hash: string): boolean => {
            return hash === this.window.location.hash.slice(1);
        }
    }       
} 
