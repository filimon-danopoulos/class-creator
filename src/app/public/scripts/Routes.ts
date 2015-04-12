module App {
    export class Routes {
        public static setUp(routeProvider: ng.route.IRouteProvider) {
            routeProvider
                .when('/', {
                    templateUrl: 'scripts/home/templates/HomeView.html',
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
