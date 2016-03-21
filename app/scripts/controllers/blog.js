'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl($state, request, $sessionStorage, $uibModal, growl) {
        var self = this;

        function init() {
            if ($sessionStorage.postID) {
                delete $sessionStorage.postID;
            }
            self.loading = true;
            getPosts();
        }

        function getPosts() {
            request.name = 'blog';
            request.getObjects().then(function (res) {
                self.blogPosts = res.data;
                self.loading = false;
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
                request.name = 'blog';
                request.create(page).then(function (res) {
                    self.editPage(res.id);
                }, function (err) {
                    growl.add('danger', 'Could not create page', 3000);
                });
            });
        };

        self.editPage = function (index) {
            $state.go('.post', {id: index});
            $sessionStorage.postID = index;
        };

        init();
    }

    function PostCtrl($scope, $state, request, $sessionStorage, $timeout, growl) {
        var self = this;
        var id = $sessionStorage.postID;

        function init() {
            request.name = 'blog';
            self.loading = true;
            getPage();
        }

        function watchDate() {
            $scope.$watch(function() {
                return self.page.publishDate;
            }, function(newDate, oldDate) {
                if (newDate !== oldDate) {
                    self.updatePage();
                    self.dateSelector = false;
                }
            });
        }

        self.staticDateOptions = {showWeeks: false, minDate: moment()}

        function getPage() {
            request.getObject(id).then(function (res) {
                self.page = res;
                self.loading = false;
                self.editContent('enContent');
                watchDate();
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

        self.updatePage = function () {
            var data = self.page;
            request.update(id, data).then(function (res) {
                self.saved = true;
                savedMsg();
            }, function (err) {
                console.log(err);
            });
        }

        self.saveContent = function (content) {
            self.loading = true;

            var name = self.openContent + '/';

            function create () {
                content.post = self.page.id; //set relationship
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

        self.deletePage = function () {
            self.loading = true;
            request.delete(id).then(function (res) {
                growl.add('success', 'Page Successfully Deleted', 3000);
                $state.go('blog');
            }, function () {
                growl.add('danger', 'Page could not be deleted. Please try again later.', 3000);
                self.loading = false;
            });
        }

        init();
    }


    angular.module('ezadmin')
        .controller('BlogCtrl', ['$state', 'request', '$sessionStorage', '$uibModal', 'growl', BlogCtrl])
        .controller('PostCtrl', ['$scope', '$state', 'request', '$sessionStorage', '$timeout', 'growl', PostCtrl]);
})();
