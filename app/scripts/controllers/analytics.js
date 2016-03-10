'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AnalyticsCtrl
     * @description
     * # AnalyticsCtrl
     * Analytics controller of the ngezadmin
     */


    function AnalyticsCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
        }

        init();
    }

    angular.module('ezadmin')
        .controller('AnalyticsCtrl', ['$state', 'request', '$sessionStorage', AnalyticsCtrl]);
})();
