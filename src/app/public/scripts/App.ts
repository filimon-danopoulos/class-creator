/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./Routes" />
/// <reference path="./Main" />


module App {
    export function init() {
        // Set up dependencies
        var dependencies =  ['ngRoute'],
            modules = [];

        modules = Main.init("App");
        dependencies = dependencies.concat(modules);

        // Define the application module and inject all dependencies 
        angular.module('App', dependencies)
            .config(["$routeProvider", function ($routeProvider: ng.route.IRouteProvider) {
                // Set up routing
                App.Routes.setUp($routeProvider);
            }]);
    }
}
// Initialize application
App.init();
