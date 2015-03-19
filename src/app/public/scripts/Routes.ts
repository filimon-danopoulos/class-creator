/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />

module App {
    export class Routes {
        public static setUp(routeProvider) {
            routeProvider
                .when('/', {
                    templateUrl: 'scripts/home/HomeView.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                })
                .when('/about', {
                    templateUrl: 'scripts/about/AboutView.html',
                    controller: 'AboutController',
                    controllerAs: 'about'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    }
}
