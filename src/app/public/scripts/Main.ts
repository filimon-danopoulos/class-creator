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

        // Define and instantiate all the submodules
        var modules = ['App.Controller'];
        modules.forEach(x => angular.module(x, []));
        
        // Register the controller module with angular.
        angular.module("App.Controller", [])
            .config(["$controllerProvider", function($controllerProvider) {
                Object.keys(App.Controller)
                    .filter( p => App.Controller.hasOwnProperty(p))
                    .forEach( c => {
                        var dependencies = getDependencies(App.Controller, c);
                        $controllerProvider.register(c, dependencies);
                    });
            }]);
        // Add the controller module as a dependency
        modules.push("App.Controller");

        // Define the application module and inject all dependencies and modules. 
        var app = angular.module('App', dependencies.concat(modules));

        app.config(["$routeProvider", function ($routeProvider:ng.route.IRouteProvider) {
            App.Routes.setUp($routeProvider);
        }]);
    }
}

App.init();
