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

    function PageCtrl($state, request, $sessionStorage, $timeout, growl, savePage) {
        var self = this;
        var id = $sessionStorage.pageID;

        function init() {
            request.name = 'pages';
            self.loading = true;
            getPage();
        }

        function getPage() {
            request.name = 'pages';
            request.getObject(id).then(function (res) {
                self.page = res;
                self.loading = false;
                self.editContent('enContent'); //default to English
            }, function (err) {
                growl.add('danger', err, 3000);
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
            self.loading = true;
            request.getObject(id).then(function (res) {
                self.loading = false;
                self.page = res;
                self.content = self.page[lng][0];
            });
        }

        self.openedContent = function (lng) {
            return self.openContent === lng;
        }

        self.saveContent = function (data) {
            self.loading = true;
            var params = {
                name: self.openContent,
                type: 'page',
                pageId: self.page.id
            }
            savePage.save(data, params).then(function (res) {
                self.saved = true;
                savedMsg();
                getPage();
                growl.add('success', 'You did it!', 3000);
            }, function (err) {
                console.log(err);
                growl.add('danger', 'Unable to Save Post. Contact Admin.', 3000);
                self.loading = false;
            });
        }

        init();
    }

    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl])
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', '$timeout', 'growl', 'savePage', PageCtrl]);
})();
