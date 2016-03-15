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
            getPages();
        }

        function getPages() {
            request.getPages().then(function (res) {
                self.pages = res.data;
            });
        }// ...set up message when request fails here ^^^^

        self.editPage = function (index) {
            $sessionStorage.pageID = index;
            $state.go('.page', {id: index});
        };

        init();
    }

    function PageCtrl($state, request, $sessionStorage) {
        var self = this;
        var id = $sessionStorage.pageID;

        function init() {
            request.name = 'pages';
            self.loading = true;
            self.openContent = 'en'; //default english
            getPage();
        }

        function getPage() {
            request.getPage(id).then(function (res) {
                self.page = res;
                self.loading = false;
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
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
                getPage();
                self.loading = false;
            }, function (err) {
                console.log(err);
                self.loading = false;
            });
        }

        init();
    }

    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl])
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', PageCtrl]);
})();
