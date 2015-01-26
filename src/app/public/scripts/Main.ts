/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />


module App {
    export function registerController(controllerName: string, dependencies: string[]) {
        dependencies.push(App.Controller[controllerName]);
        angular.module("App.Controller").controller(controllerName, dependencies);
    }

    
    export function init() {
         // Set up dependencies
        var dependencies =  ['ngRoute'];
        // Define and instantiate all the submodules
        var modules = ['App.Controller'];
        modules.forEach(x => angular.module(x, []));

        // Define the application module and inject all dependencies and modules. 
        angular.module('App', dependencies.concat(modules));
        
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
