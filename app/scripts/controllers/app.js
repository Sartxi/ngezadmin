'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */


    function AppCtrl($rootScope, $state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
            $rootScope.multilingual = true; //use settings when available
        }

        self.logout = function () {
            request.logout();
            $state.go('login');
        }

        init();
    }

    angular.module('ezadmin')
        .controller('AppCtrl', ['$rootScope', '$state', 'request', '$sessionStorage', AppCtrl]);
})();
