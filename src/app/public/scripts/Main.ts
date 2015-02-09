/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./Routes" />

module App {
    function getServiceName(serviceName: string) {
        // When registering services we are registering a constructor that angular calls. 
        // This means that we request a singleton instance of the service, so we would want to 
        // register the service as a component with a lower case leading character so that 
        // we can avoid the akward: 
        // class SomeController(SomeService) {
        //    SomeService.serviceMember(...);
        // }
        // In favor for the much more logical:
        // class SomeController(someService) {
        //    someService.serviceMember(...);    
        // }
        return serviceName[0].toLowerCase()+serviceName.slice(1);  
    }

    export function init() {
        console.info("Intitializing...");
        // Set up dependencies
        var dependencies =  ['ngRoute'];

        // Register the service module as the angular module "App.Service". 
        angular.module("App.Service", [])
            .config(["$provide", function($provide) {
                // Get all service from the App.Service namespace and register them with angular.
                // Since application is bootstraped already we have to use $provide.service() 
                // If you would have tried to register them via .service() angular would have crashed. 
                Object.keys(App.Service)
                    .filter(p => App.Service.hasOwnProperty(p) &&
                                 App.Service.AngularService.prototype.isPrototypeOf(App.Service[p].prototype) )
                    .forEach(s => $provide.service(getServiceName(s), App.Service[s]));
            }]);
        // Add the service module as a dependency
        dependencies.push("App.Service");
        
        // Register factory module as the angular module "App.Factory".
        angular.module("App.Factory", [])
            .config(["$provide", function($provide) {
                // This is very similar to the service example above.
                // For an analogous explanation see that comment.
                Object.keys(App.Factory)
                    .filter(p => App.Factory.hasOwnProperty(p) && (typeof App.Factory[p]) === "function")
                    .forEach(f => $provide.factory(f, App.Factory[f]));
            }]);
        // Again add the angular module to the dependency list.
        dependencies.push("App.Factory");

        // Register the controller module as the angular module "App.Controller".
        angular.module("App.Controller", [])
            .config(["$controllerProvider", function($controllerProvider) {
                // Get all controllers and register them via the $controllerProvider. 
                // We have to use $controllerProvider in the config section since the application is already bootstraped. 
                // Similarly to the service case if you would have tried to add them as usual 
                // via .controller() they would not be found by angular. 
                Object.keys(App.Controller)
                    .filter(p => App.Controller.hasOwnProperty(p))
                    .forEach(c => $controllerProvider.register(c, App.Controller[c]));
            }]);
        // Add the controller module as a dependency
        dependencies.push("App.Controller");

        // Define the application module and inject all dependencies 
        var app = angular.module('App', dependencies);
        
        // Configure routing
        app.config(["$routeProvider", function ($routeProvider: ng.route.IRouteProvider) {
            App.Routes.setUp($routeProvider);
        }]);
    }
}
// Initialize application
App.init();
