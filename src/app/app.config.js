(function () {
    'use strict';

    angular.module('app')
        .config(routeConfig);


    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        // Remove '#/' from urls
        $locationProvider.html5Mode(true);

        // Optional trailing forward slash
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.url();
            if (path[path.length - 1] === '/' && path.indexOf('?') == -1) {
                return path.substring(0, path.length - 1);
            }
            if (path.indexOf('/?') > 0) {
                return path.replace('/?', '?');
            }
            return;
        });
        // http://stackoverflow.com/questions/24167512/angularui-router-multiple-states-with-same-url-pattern



        $stateProvider
            .state('app', {
                abstract: true,
                controller: 'AppController as vm',
                templateUrl: 'app/app.htm'
            })
            .state('app.home', {
                controller: 'HomeController as vm',
                templateUrl: 'app/home/home.htm',
                url: '/'
            })
            .state('app.account', {
                controller: 'AccountController as vm',
                templateUrl: 'app/account/account.htm',
                url: '/account'
            })
    }
})();
