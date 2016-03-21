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

    function PageCtrl($state, request, $sessionStorage, $timeout, growl) {
        var self = this;
        var id = $sessionStorage.pageID;

        function init() {
            request.name = 'pages';
            self.loading = true;
            getPage();
        }

        function getPage() {
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

        self.saveContent = function (content) {
            self.loading = true;

            var name = self.openContent + '/';

            function create () {
                content.page = self.page.id; //set relationship
                request.createContent(name, content).then(function (res) {
                    self.loading = false;
                    self.saved = true;
                    savedMsg();
                    growl.add('success', 'You did it!', 3000);
                }, function (err) {
                    console.log(err);
                    growl.add('danger', err, 3000);
                    self.loading = false;
                });
            }
            function update () {
                request.updateContent(name, content).then(function () {
                    self.loading = false;
                    self.saved = true;
                    savedMsg();
                    growl.add('success', 'You did it!', 3000);
                }, function (err) {
                    console.log(err);
                    growl.add('danger', err, 3000);
                    self.loading = false;
                });
            }
            if (content.id) {update();} else {create();}
        }

        init();
    }

    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl])
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', '$timeout', 'growl', PageCtrl]);
})();
