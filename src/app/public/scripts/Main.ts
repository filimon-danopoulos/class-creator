/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />


module App {
    export function registerController(controllerName: string, dependencies: string[]) {
        dependencies.push(App.Controller[controllerName]);
        angular.module("App.Controller").controller(controllerName, dependencies);
    }

    
    export function init() {
         // Create and register modules and dependencies
        var dependencies =  ['ngRoute'];
        angular.module('App.Controller', []);
        angular.module('App', dependencies.concat(['App.Controller']));
        
        // Set up routes
        angular.module('App').config(['$routeProvider', function routes($routeProvider:ng.route.IRouteProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/HomeView.html',
                    controller: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
    }
}

App.init();
