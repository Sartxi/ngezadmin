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

    function PostCtrl($scope, $state, request, $sessionStorage, $timeout, growl, savePage) {
        var self = this;
        var id = $sessionStorage.postID;

        function init() {
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
            request.name = 'blog';
            request.getObject(id).then(function (res) {
                self.page = res;
                self.loading = false;
                self.editContent('en');
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
            request.name = 'blog';
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

        self.updatePage = function () {
            var data = self.page;
            request.update(id, data).then(function (res) {
                self.saved = true;
                savedMsg();
            }, function (err) {
                console.log(err);
            });
        }

        self.saveContent = function (data, orgs) {
            self.loading = true;
            var params = {
                name: 'content',
                type: 'post',
                pageId: self.page.id
            }
            savePage.save(data, params, orgs).then(function (res) {
                self.saved = true;
                savedMsg();
                getPage();
                delete self.orgs;
                growl.add('success', 'You did it!', 3000);
            }, function (err) {
                console.log(err);
                growl.add('danger', 'Unable to Save Post. Contact Admin.', 3000);
                self.loading = false;
            });
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
        .controller('PostCtrl', ['$scope', '$state', 'request', '$sessionStorage', '$timeout', 'growl', 'savePage', PostCtrl]);
})();
