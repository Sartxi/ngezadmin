'use strict';

angular.module('ezadmin')
	.directive('adminMenu', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'views/partials/menu.html'
        };
    })
    .directive('loader', function () {
        return {
            restrict: 'EA',
            template: '<span class="loading"><img src="assets/images/loading.gif"></span>'
        };
    });
