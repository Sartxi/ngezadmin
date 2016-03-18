'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:LndPagesCtrl
     * @description
     * # LndPagesCtrl
     * Landing Pages controllers of the ngezadmin
     */


    function LndPagesCtrl($state, request, $sessionStorage, $uibModal) {
        var self = this;

        function init() {
            if ($sessionStorage.lndID) {
                delete $sessionStorage.lndID;
            }
            request.name = 'lndPages';
            self.loading = true;
            getPages();
        }
        function getPages() {
            request.getObjects().then(function (res) {
                self.landingPages = res.data;
                self.loading = false;
            }, function (err) {
                self.loading = false;
                console.log(err.message);
            });
        }
        self.createPage = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'sm',
                templateUrl: 'views/partials/new-page.html',
                controller: 'NewPageCtrl',
                windowClass: 'normalModal'
            });

            modalInstance.result.then(function (page) {
                request.create(page).then(function (res) {
                    self.editPage(res.id);
                }, function (err) {
                    console.log(err.message);
                });
            });
        };

        self.editPage = function (index) {
            $state.go('.lndpage', {id: index});
            $sessionStorage.lndID = index;
        };

        init();
    }

    function LndPageCtrl($state, request, $sessionStorage, $timeout, growl) {
        var self = this;
        var id = $sessionStorage.lndID;

        function init() {
            request.name = 'lndPages';
            self.loading = true;
            self.openContent = 'en';
            getPage();
        }

        function getPage() {
            request.getObject(id).then(function (res) {
                self.page = res;
                self.loading = false;
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
        }

        function savedMsg() {
            $timeout(function() {
                self.saved = false;
            }, 1500);
        }

        self.editContent = function (lng) {
            self.openContent = lng;
        }

        self.openedContent = function (lng) {
            return self.openContent === lng;
        }

        self.updatePage = function () {
            var data = self.page;
            request.update(id, data).then(function (res) {
                self.saved = true;
                savedMsg();
            }, function (err) {
                console.log(err);
            });
        }

        self.saveContent = function (name, content) {
            self.loading = true;
            request.updateContent(name, content).then(function (res) {
                self.saved = true;
                savedMsg();
                getPage();
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
        }

        self.deletePage = function () {
            self.loading = true;
            request.delete(id).then(function (res) {
                $state.go('lndPages');
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
        }

        init();
    }


    angular.module('ezadmin')
        .controller('LndPagesCtrl', ['$state', 'request', '$sessionStorage', '$uibModal', LndPagesCtrl])
        .controller('LndPageCtrl', ['$state', 'request', '$sessionStorage', '$timeout', 'growl', LndPageCtrl]);
})();
