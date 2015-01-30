/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./Routes.ts" />

module App {
    function getDependencies(module: Object, name: string) {
        var dependencies = /\((.*?)\)/.exec(module[name].toString())[1]
            .replace(/ /g, "")
            .split(",");
        dependencies.push(module[name]);
        return dependencies;
    }

    export function init() {
        // Set up dependencies
        var dependencies =  ['ngRoute'];

        // Register the service module in a similar way to the controller module. 
        angular.module("App.Service", [])
            .config(["$provide", function($provide) {
                // ns for namespace
                var ns = App.Service;
                Object.keys(App.Service)
                    .filter( p => ns.hasOwnProperty(p) && ns.AngularService.prototype.isPrototypeOf(ns[p].prototype) )
                    .forEach( s => $provide.service(s, getDependencies(ns, s)));
            }]);
        // Add the service module as a dependency
        dependencies.push("App.Service");


        // Register the controller module with angular as the angular module "App.Controller".
        angular.module("App.Controller", [])
            .config(["$controllerProvider", function($controllerProvider) {
                // Get all controllers and register them via the $controllerProvider. 
                // We have to use $controllerProvider in the config section since the application is already bootstraped. 
                // If you would have tried to add them as usual via .controller(...) they would not be found by angular. 
                Object.keys(App.Controller)
                    .filter( p => App.Controller.hasOwnProperty(p))
                    .forEach( c => $controllerProvider.register(c, getDependencies(App.Controller, c)));
            }]);
        // Add the controller module as a dependency
        dependencies.push("App.Controller");

        // Define the application module and inject all dependencies 
        var app = angular.module('App', dependencies);

        app.config(["$routeProvider", function ($routeProvider:ng.route.IRouteProvider) {
            App.Routes.setUp($routeProvider);
        }]);
    }
}

App.init();
