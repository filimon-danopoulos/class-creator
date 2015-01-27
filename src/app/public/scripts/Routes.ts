/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />

module App {
    export class Routes {
        public static setUp() {
            angular.module('App').config(['$routeProvider', function routes($routeProvider:ng.route.IRouteProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'views/HomeView.html',
                        controller: 'HomeController'
                    })
                    .when('/about', {
                        templateUrl: 'views/AboutView.html',
                        controller: 'AboutController'    
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }]);
        }    
    }
}
