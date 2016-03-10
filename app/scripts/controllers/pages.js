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

    angular.module('ezadmin')
        .controller('PagesCtrl', ['$state', 'request', '$sessionStorage', PagesCtrl]);
})();

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:PageCtrl
     * @description
     * # PagesCtrl
     * Page controller of the ngezadmin
     */

    function PageCtrl($state, request, $sessionStorage) {
        var self = this;
        var id = $sessionStorage.pageID;

        function init() {
            request.name = 'pages';
            self.loading = true;
            console.log('getting there');
            getPage();
        }

        function getPage() {
            request.getPage(id).then(function (res) {
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
        .controller('PageCtrl', ['$state', 'request', '$sessionStorage', PageCtrl]);
})();
