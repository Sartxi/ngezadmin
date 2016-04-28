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
            self.loading = true;
            getPages();
        }

        function getPages() {
            request.name = 'pages';
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
                self.editContent('en'); //default to English
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
                var content = res.content;
                if (content.length > 0) {
                    var lngMatch;
                    angular.forEach(content, function (obj) {
                        if (obj.language === lng) {
                            self.content = obj;
                            lngMatch = true;
                        }
                    });
                    if (!lngMatch) {
                        self.content = {language: lng}
                    }
                } else {
                    var newContentarray = [];
                    var newContent = {};
                        newContent.language = lng;
                    newContentarray.push(newContent);
                    self.content = newContentarray[0];
                }
            });
        }

        self.openedContent = function (lng) {
            return self.openContent === lng;
        }

        self.saveContent = function (data) {
            self.loading = true;
            var params = {
                name: 'content',
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
