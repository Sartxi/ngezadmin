'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:MainCtrl
     * @description
     * # MainCtrl
     * Main controller of the todoApp fot viewing and adding to do items
     */


    function MainCtrl($state, request) {
        var self = this;

        /**
         * init by reading the to do list from the database
         */
        function init() {
            request.name = 'testinground';
        }

        /**
         * Logout from Backand
         */
        self.logout = function () {
            request.logout();
            $state.go('login');
        }

        /**
         * Handle promise error call
         * @param error
         * @param message
         */
        function errorHandler(error) {
            console.log(error);
        }

        init();
    }

    angular.module('ezadmin').controller('MainCtrl', ['$state', 'request', MainCtrl]);
})();
