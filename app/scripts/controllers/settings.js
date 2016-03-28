'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:SettingsCtrl
     * @description
     * # SettingsCtrl
     * Settings controllers of the ngezadmin
     */


    function SettingsCtrl($state, request, $sessionStorage, $window, growl) {
        var self = this;

        function init() {
            self.loading = true;
            getSettings();
            getUserId();
        }

        function getSettings() {
            var id = 1;
            request.name = 'settings';
            request.getObject(1).then(function (res) {
                self.loading = false;
                self.settings = res;
            });
        }

        function getUser(id) {
            request.name = 'users';
            request.getObject(id).then(function (res) {
                self.loading = false;
                self.user = res;
                self.userSettings = res.settings[0];
            });
        }

        function getUserId() {
            var user = [];
            var userInfo = $window.localStorage.BACKANDuser;
            user.push(angular.fromJson(userInfo));
            var id = user[0].userId;
            getUser(id);
        }

        self.saveSettings = function () {
            request.name = 'settings';
            request.update(self.settings.id, self.settings).then(function () {
                growl.add('success', 'Your settings are Saved!', 3000);
                $window.location.reload();
            }, function () {
                growl.add('danger', 'Could not save settings!', 3000);
            });
        }

        self.saveUserSettings = function () {
            var data = {
                id: self.userSettings.id,
                lsMenu: self.userSettings.lsMenu,
                avatar: self.userSettings.avatar,
                user: self.user.id
            }
            request.name = 'userSettings';
            request.update(data.id, data).then(function () {
                growl.add('success', 'Your settings are Saved!', 3000);
                $window.location.reload();
            }, function () {
                growl.add('danger', 'Could not save settings!', 3000);
            });
        }

        self.logout = function () {
            request.name = 'users';
            request.logout();
            $state.go('login');
        }

        init();
    }

    angular.module('ezadmin')
        .controller('SettingsCtrl', ['$state', 'request', '$sessionStorage', '$window', 'growl', SettingsCtrl]);
})();
