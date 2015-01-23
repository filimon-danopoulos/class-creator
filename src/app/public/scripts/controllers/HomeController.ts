/// <reference path="../Main.ts" />

module App.Controller {
    export class HomeController {
        constructor($scope) {
            $scope.test = "Test";
        }
    }        
} 

App.registerController("HomeController", ["$scope"]);
