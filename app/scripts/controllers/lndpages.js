'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:LndPagesCtrl
     * @description
     * # LndPagesCtrl
     * Landing Pages controllers of the ngezadmin
     */


    function LndPagesCtrl($state, request, $sessionStorage, $uibModal, growl) {
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
                    growl.add('danger', 'Could not create page', 3000);
                });
            });
        };

        self.editPage = function (index) {
            $state.go('.lndpage', {id: index});
            $sessionStorage.lndID = index;
        };

        init();
    }

    function LndPageCtrl($scope, $state, request, $sessionStorage, $timeout, growl, savePage) {
        var self = this;
        var id = $sessionStorage.lndID;

        function init() {
            request.name = 'lndPages';
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
            request.name = 'lndPages';
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

        self.saveContent = function (data) {
            self.loading = true;
            var params = {
                name: 'content',
                type: 'lndPage',
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

        self.deletePage = function () {
            self.loading = true;
            request.delete(id).then(function (res) {
                growl.add('success', 'Page Successfully Deleted', 3000);
                $state.go('lndPages');
            }, function () {
                growl.add('danger', 'Page could not be deleted. Please try again later.', 3000);
                self.loading = false;
            });
        }

        init();
    }


    angular.module('ezadmin')
        .controller('LndPagesCtrl', ['$state', 'request', '$sessionStorage', '$uibModal', 'growl', LndPagesCtrl])
        .controller('LndPageCtrl', ['$scope', '$state', 'request', '$sessionStorage', '$timeout', 'growl', 'savePage', LndPageCtrl]);
})();
