'use strict';

angular.module('ezadmin', [
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'mytodoApp.config.interceptors',
    'backand',
    'ngStorage',
    'angular.filter',
    'ui.bootstrap'
])
.config(['$stateProvider','$httpProvider', '$urlRouterProvider', 'BackandProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider)
    {
        BackandProvider.setAnonymousToken('f8c1eb11-4b3b-4916-823a-2fd431ea277c');
        BackandProvider.setSignUpToken('e19b5a4d-f8b6-4dc7-b459-ad6517120dc2');

        $httpProvider.interceptors.push('todoHttpInterceptor');
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('todos', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl as vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl as vm'
        });
    }
]);
