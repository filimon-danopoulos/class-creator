/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./Routes.ts" />

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
        App.Routes.setUp();
    }
}

App.init();
