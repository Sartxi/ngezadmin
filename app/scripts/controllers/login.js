'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */
    function LoginCtrl(Backand, $location) {
        var self = this;

        function init() {
            self.username = '';
            self.password = '';
            self.appName  = 'testinground';
        }

        self.signIn = function() {
            //set the your app name
            Backand.setAppName(self.appName);

            //sign in to Backand
            Backand.signin(self.username, self.password)
                .then(function () {
                    $location.path('/');
                }, function (data) {
                    self.error = data && data.error_description || 'Unknown error from server';
                }
            );
        }
        init();
    }

    angular.module('ezadmin')
        .controller('LoginCtrl', ['Backand', '$location', LoginCtrl]);
})();