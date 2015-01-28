/// <reference path="../../../thirdparty/angular/angular-all.d.ts" />

module App {
    export class Routes {
        public static setUp(routeProvider) {
            routeProvider
                .when('/', {
                    templateUrl: 'views/Home/HomeView.html',
                    controller: 'HomeController'
                })
                .when('/about', {
                    templateUrl: 'views/About/AboutView.html',
                    controller: 'AboutController'    
                })
                .otherwise({
                    redirectTo: '/'
                });
        }    
    }
}
