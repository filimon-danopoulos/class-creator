/// <reference path="../Main.ts" />

module App.Controller {
    export class AboutController {
        constructor($scope) {
            this.scope = $scope;
            $scope.message = "Testar om min koola grej fungerar!";
        }
        private scope; 
    }       
} 
