/// <reference path="../Main.ts" />

module App.Controller {
    export class HomeController extends App.BaseController {
        constructor($scope) {
            $scope.test = "Test";
            super(["$scope"]);    
        }        
    }    
}
