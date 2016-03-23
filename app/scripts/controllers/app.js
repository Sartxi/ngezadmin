'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */


    function AppCtrl($rootScope, $state, request, $sessionStorage) {
        var self = this;

        function init() {
            settings();
            $rootScope.multilingual = true; //use settings when available
        }

        function settings() {
            var id = 1; //only one record necassary
            request.name = 'settings';
            request.getObject(id).then(function (res) {
                $rootScope.settings = res;
            });
        }

        self.logout = function () {
            request.name = 'users';
            request.logout();
            $state.go('login');
        }

        $rootScope.toggleMenuLs = function () {
            if ($rootScope.menuLs) {
                $rootScope.menuLs = false;
            } else {
                $rootScope.menuLs = true;
            }
        }

        init();
    }

    function NewPageCtrl($scope, $uibModalInstance) {
        function init() {
            $scope.newPage = {
                active: false
            }
        }
        $scope.openDatePicker = function() {
            $scope.datePicker = true;
        };
        $scope.dateOptions = {
            showWeeks: false,
            minDate: moment()
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.ok = function (name) {
            $uibModalInstance.close(name);
        };
        init();
    }

    function ImgGalleryCtrl($scope, request, $uibModalInstance) {
        var self = this;

        function init() {
            request.name = 'imgGallery';
            $scope.title = 'Image Gallery';
            $scope.gridType = 1;
            getImg();
        }

        function getImg() {
            request.getObjects().then(function (res) {
                $scope.imgGallery = res.data;
            }, function (err) {
                console.log(err);
            });
        }

        $scope.$watch('gridType', function (index) {
            if (index === 0) {
                $scope.layoutCol = 'col-md-3';
                $scope.imgSize = 'sml';
            } else if (index === 1) {
                $scope.layoutCol = 'col-md-4';
                $scope.imgSize = 'mdm';
            } else if (index === 2) {
                $scope.layoutCol = 'col-md-12';
                $scope.imgSize = 'lrg';
            } else if (index === 3) {
                $scope.layoutCol = 'col-md-12';
                $scope.imgSize = 'img-responsive';
            }
        });

        $scope.hasActive = function (index) {
            if ($scope.activeImg >= 0 && $scope.activeImg !== index) {
                return true;
            } else {
                return false;
            }
        };

        $scope.makeImgActive = function (index) {
            $scope.gridType = 3;
            $scope.activeImg = index;
        };

        $scope.activeSpecs = function (index) {
            return $scope.activeImg === index;
        };

        $scope.showALL = function () {
            delete $scope.activeImg;
            $scope.addImage = false;
            $scope.gridType = 1;
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.selectImg = function (img) {
            var imgHTML;
            if (img.linked) {
                if (img.float === 'middle') {
                    imgHTML = '<p class="text-center"><a href="' + img.imghref + '" target="_blank"><img alt="' + img.imgalt + '" src="' + img.imgurl + '"' + 'style="width:' + img.imgwidth + 'px"/>' + '</a></p>';
                } else {
                    imgHTML = '<a href="' + img.imghref + '" target="_blank"><img alt="' + img.imgalt + '" src="' + img.imgurl + '"' + 'style="width:' + img.imgwidth + 'px; float:' + img.float + '"/>' + '</a>';
                }
            } else {
                if (img.float === 'middle') {
                    imgHTML = '<p class="text-center"><img' + ' alt="' + img.imgalt + '" src="' + img.imgurl + '"' + 'style="width:' + img.imgwidth + 'px; margin:0 auto"/></p>';
                } else {
                    imgHTML = '<img' + ' alt="' + img.imgalt + '" src="' + img.imgurl + '"' + 'style="width:' + img.imgwidth + 'px; float:' + img.float + '"/>';
                }
            }
            $uibModalInstance.close(imgHTML);
        };

        init();
    }

    function layoutGalleryCtrl($scope, $uibModalInstance) {
        function init () {
            $scope.title = 'Select a Layout';
            $scope.layoutGallery = [
                {imgurl: 'assets/images/singleColumn.jpg', template: 'Single Column', title: 'Single Column'},
                {imgurl: 'assets/images/sidebarLeft.jpg', template: 'Sidebar Left', title: 'Sidebar Left'},
                {imgurl: 'assets/images/sidebarRight.jpg', template: 'Sidebar Right', title: 'Sidebar Right'},
                {imgurl: 'assets/images/triColumn.jpg', template: 'Tri-Column', title: 'Tri-Column'}
            ];
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.selectLayout = function (layout, selection) {
            var template;
            if (selection === 0) {
                template = '<div class="col-md-12"><h3>Single Column</h3><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p></p></div>';
            } else if (selection === 1) {
                template = '<div class="col-md-4"><p>Add an Image</p><img alt="Snap Tools" src="assets/images/printer.png" class="img-responsive" style="text-align: center;margin:0 auto;"></div><div class="col-md-8"><h3>Sidebar Left</h3><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p></div>';
            } else if (selection === 2) {
                template = '<div class="col-md-8"><h3>Sidebar Right</h3><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p></div><div class="col-md-4"><img alt="Snap Tools" src="assets/images/printer.png" class="img-responsive" style="text-align: center;margin:0 auto;"></div>';
            } else if (selection === 3) {
                template = '<div class="col-md-4"><img alt="Snap Print" src="assets/images/printer.png" class="img-responsive" style="text-align: center;margin:0 auto;"></div><div class="col-md-4"><h2 style="text-align: left;">Tri-Column</h2><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div><div class="col-md-4"><p><br></p><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>';
            }
            layout.template = template;
            $uibModalInstance.close(layout.template);
        };
        init();
    }

    angular.module('ezadmin')
        .controller('AppCtrl', ['$rootScope', '$state', 'request', '$sessionStorage', AppCtrl])
        .controller('NewPageCtrl', ['$scope', '$uibModalInstance', NewPageCtrl])
        .controller('ImgGalleryCtrl', ['$scope', 'request', '$uibModalInstance', ImgGalleryCtrl])
        .controller('layoutGalleryCtrl', ['$scope', '$uibModalInstance', layoutGalleryCtrl]);
})();
