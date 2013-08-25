'use strict';

angular.module('projectApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/html/home.html'
            })
            .when('/welcome', {
                templateUrl: 'views/html/welcome.html'
            })
            .when('/main', {
                templateUrl: 'views/html/main.html',
                controller: 'MainCtrl'
            })
            .when('/first-steps', {
                templateUrl: 'views/html/first-steps.html'
            })
            .when('/design', {
                templateUrl: 'views/html/design.html'
            })
            .when('/routes', {
                templateUrl: 'views/html/routes.html'
            })
            .when('/accessibility', {
                templateUrl: 'views/html/accessibility.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });