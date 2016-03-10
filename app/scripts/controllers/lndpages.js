'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:LndPagesCtrl
     * @description
     * # LndPagesCtrl
     * Landing Pages controllers of the ngezadmin
     */


    function LndPagesCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
        }

        init();
    }

    function LndPageCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
            $scope.loading = true;
        }

        init();
    }


    angular.module('ezadmin')
        .controller('LndPagesCtrl', ['$state', 'request', '$sessionStorage', LndPagesCtrl])
        .controller('LndPageCtrl', ['$state', 'request', '$sessionStorage', LndPageCtrl]);
})();
