'use strict';

(function() {

    /**
     * @ngdoc function
     * @name ezadmin.controller:PagesCtrl
     * @description
     * # PagesCtrl
     * Pages controllers of the ngezadmin
     */


    function PagesCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
            self.loading = true;
            getPages();
        }

        function getPages() {
            request.getObjects().then(function (res) {
                self.loading = false;
                self.pages = res.data;
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
        }

        self.editPage = function (index) {
            $sessionStorage.pageID = index;
            $state.go('.page', {id: index});
        };

        init();
    }

    function PageCtrl($state, request, $sessionStorage, $timeout) {
        var self = this;
        var id = $sessionStorage.pageID;

        function init() {
            request.name = 'pages';
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

        self.updatePageContent = function (name, content) {
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

        init();
    }

    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl])
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', '$timeout', PageCtrl]);
})();
