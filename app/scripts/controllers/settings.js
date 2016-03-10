'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:SettingsCtrl
     * @description
     * # SettingsCtrl
     * Settings controllers of the ngezadmin
     */


    function SettingsCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
        }

        init();
    }

    angular.module('ezadmin')
        .controller('SettingsCtrl', ['$state', 'request', '$sessionStorage', SettingsCtrl]);
})();
