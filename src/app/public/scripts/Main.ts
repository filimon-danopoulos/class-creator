/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./Routes.ts" />

module App {
    function getDependencies(module: Object, name: string) {
        var dependencies = [],
            dependencyString = /\((.*?)\)/.exec(module[name].toString())[1]
            .replace(/ /g, "");
        // A component is not required to have any dependecies.
        if (dependencyString) {
            dependencies = dependencies.concat(dependencyString.split(","));
        }
        // Always add the actual function last so that it follows the angular standard:
        // ["dep1", "dep2", ... , function(dep1, dep2, ...) { }
        dependencies.push(module[name]);
        return dependencies;
    }

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
        // Set up dependencies
        var dependencies =  ['ngRoute'];

        // Register the service module as the angular module "App.Service". 
        angular.module("App.Service", [])
            .config(["$provide", function($provide) {
                // ns for namespace
                var ns = App.Service;
                // Get all service from the App.Service namespace and register them with angular.
                // Since application is bootstraped already we have to use $provide.service() 
                // If you would have tried to register them via .service() angular would have crashed. 
                Object.keys(ns)
                    .filter( p => ns.hasOwnProperty(p) && ns.AngularService.prototype.isPrototypeOf(ns[p].prototype) )
                    .forEach( s => $provide.service(getServiceName(s), getDependencies(ns, s)));
            }]);
        // Add the service module as a dependency
        dependencies.push("App.Service");
        
        // Register factory module as the angular module "App.Factory".
        angular.module("App.Factory", [])
            .config(["$provide", function($provide) {
                // This is very similar to the service example above.
                // For an analogous explanation see that comment.
                var ns = App.Factory;
                Object.keys(ns)
                    .filter( p => ns.hasOwnProperty(p) && (typeof ns[p]) === "function")
                    .forEach( f => $provide.factory(f, getDependencies(ns, f)));
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
                    .filter( p => App.Controller.hasOwnProperty(p))
                    .forEach( c => $controllerProvider.register(c, getDependencies(App.Controller, c)));
            }]);
        // Add the controller module as a dependency
        dependencies.push("App.Controller");

        // Define the application module and inject all dependencies 
        var app = angular.module('App', dependencies);

        app.config(["$routeProvider", function ($routeProvider: ng.route.IRouteProvider) {
            App.Routes.setUp($routeProvider);
        }]);
    }
}

App.init();
