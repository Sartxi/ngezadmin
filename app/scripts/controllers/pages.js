'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:PagesCtrl
     * @description
     * # PagesCtrl
     * Pages controller of the ngezadmin
     */


    function PagesCtrl($state, request, $sessionStorage) {
        var self = this;

        function init() {
            request.name = 'pages';
            getPages();
        }

        function getPages() {
            request.pagesList().then(function (res) {
                self.pages = res.data;
            });
        }

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
            $scope.loading = true;
        }

        function getPage(id, collection) {
            request.getPage(id, collection).then(function (res) {
                console.log(res.data);
            });
        }

        self.getContent = function (collection) {
            request.getContent(id, collection).then(function (res) {
                console.log(res.data);
            });
        }

        init();
    }


    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl])
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', PageCtrl]);
})();
