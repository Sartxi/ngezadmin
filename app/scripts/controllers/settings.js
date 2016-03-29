'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:SettingsCtrl
     * @description
     * # SettingsCtrl
     * Settings controllers of the ngezadmin
     */


    function SettingsCtrl($state, request, $sessionStorage, $window, growl, $uibModal) {
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

        self.changeAvatar = function () {
            var avatarModal = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'views/partials/avatars.html',
                controller: 'AvatarGallCtrl',
                windowClass: 'normalModal'
            });

            avatarModal.result.then(function (newAvatar) {
                var data = {
                    id: self.userSettings.id,
                    lsMenu: self.userSettings.lsMenu,
                    avatar: newAvatar.avatar,
                    user: self.user.id
                }
                request.name = 'userSettings';
                request.update(data.id, data).then(function () {
                    growl.add('success', 'Your settings are Saved!', 3000);
                    $window.location.reload();
                }, function () {
                    growl.add('danger', 'Could not save settings!', 3000);
                });
            });
        }

        self.logout = function () {
            request.name = 'users';
            request.logout();
            $state.go('login');
        }

        init();
    }

    function AvatarGallCtrl($scope, $uibModalInstance) {
        function init() {
            $scope.title = 'User Avatars';
        }

        $scope.avatars = [
            {avatar: '/assets/images/avatars/avatar1.jpg'},
            {avatar: '/assets/images/avatars/avatar2.jpg'},
            {avatar: '/assets/images/avatars/avatar3.jpg'},
            {avatar: '/assets/images/avatars/avatar4.jpg'},
            {avatar: '/assets/images/avatars/avatar5.jpg'},
            {avatar: '/assets/images/avatars/avatar6.jpg'},
            {avatar: '/assets/images/avatars/avatar7.jpg'},
            {avatar: '/assets/images/avatars/avatar8.jpg'},
            {avatar: '/assets/images/avatars/avatar9.jpg'},
            {avatar: '/assets/images/avatars/avatar10.jpg'},
            {avatar: '/assets/images/avatars/avatar11.jpg'},
            {avatar: '/assets/images/avatars/avatar12.jpg'},
            {avatar: '/assets/images/avatars/avatar13.jpg'},
            {avatar: '/assets/images/avatars/avatar14.jpg'},
            {avatar: '/assets/images/avatars/avatar15.jpg'},
            {avatar: '/assets/images/avatars/avatar16.jpg'}
        ]

        $scope.useAvatar = function (avatar) {
            $uibModalInstance.close(avatar);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        init();
    }

    angular.module('ezadmin')
        .controller('SettingsCtrl', ['$state', 'request', '$sessionStorage', '$window', 'growl', '$uibModal', SettingsCtrl])
        .controller('AvatarGallCtrl', ['$scope', '$uibModalInstance', AvatarGallCtrl]);
})();
