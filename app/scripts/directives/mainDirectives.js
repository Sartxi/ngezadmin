'use strict';

angular.module('ezadmin')
.directive('adminMenu', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'views/partials/menu.html'
    };
})

.directive('user', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partials/user.html'
    };
})

.directive('alerts', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partials/alerts.html'
    };
})

.directive('browser', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partials/browser.html'
    };
})

.directive('loader', function () {
    return {
        restrict: 'EA',
        templateUrl: 'views/partials/loading.html'
    };
})

.directive('saveMsg', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/checkmark.html'
    };
})

.directive('date', function($filter) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(date) {
                return $filter('formatDate')(date);
            });
        }
    };
});
