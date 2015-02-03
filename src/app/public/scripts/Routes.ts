/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />

module App {
    export class Routes {
        public static setUp(routeProvider) {
            routeProvider
                .when('/', {
                    templateUrl: 'views/home/HomeView.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                })
                .when('/about', {
                    templateUrl: 'views/about/AboutView.html',
                    controller: 'AboutController',
                    controllerAs: 'about' 
                })
                .otherwise({
                    redirectTo: '/'
                });
        }    
    }
}
