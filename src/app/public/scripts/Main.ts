
// Create and register modules
var modules = ['App.Controllers','App.Directives', 'App.Filters', 'App.Services'];
modules.forEach((module) => angular.module(module, []));
angular.module('App', modules);

// Url routing
angular.module('App').config(['$routeProvider',
function routes($routeProvider: ng.IRouteProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/HomeView.html',
            controller: 'App.Controllers.HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

module App {
    export module Controllers {}

    export class BaseController {
        dependencies: string[];
        constructor(dependecies: string[]) {
            this.dependencies = dependencies;
		    var className = this.constructor.toString().match(/function +?(\w*?)\(/)[1];
            var controllerName = "App.Controller."+className;
            angular.module("App.Controller").controller(controllerName, [className].concat(this.dependencies));
        }    
    }    
}
