'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
        }

        init();
    }

    function PostCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
            $scope.loading = true;
        }

        init();
    }


    angular.module('ezadmin')
        .controller('BlogCtrl', ['$state', 'request', '$sessionStorage', BlogCtrl])
        .controller('PostCtrl', ['$state', 'request', '$sessionStorage', PostCtrl]);
})();
