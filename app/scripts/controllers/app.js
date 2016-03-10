'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */


    function AppCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
        }

        self.logout = function () {
            request.logout();
            $state.go('login');
        }

        init();
    }

    angular.module('ezadmin')
        .controller('AppCtrl', ['$state', 'request', '$sessionStorage', AppCtrl]);
})();
