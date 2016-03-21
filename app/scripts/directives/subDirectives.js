'use strict';

angular.module('ezadmin')
.directive('pgListing', function () {
	return {
		restrict: 'EA',
		scope: {
			dynamic: '=',
			page: '=',
			edit: '&',
			pages: '='
		},
		templateUrl: 'views/partials/pageListing.html'
	};
})
.directive('pgDetails', function () {
	return {
		restrict: 'EA',
		scope: {
			dynamic: '=',
			page: '=',
			publish: '&',
			delete: '&'
		},
		templateUrl: 'views/partials/pageDetails.html',
		link: function (scope, elem, attrs) {
			//set form pristine on submit
			elem.on('submit', function () {
				scope.details.$setPristine();
			});
		}
	};
})
.directive('postListing', function () {
	return {
		restrict: 'EA',
		scope: {
			page: '=',
			edit: '&'
		},
		templateUrl: 'views/partials/postListing.html'
	};
})
.directive('postDetails', function (request) {
	return {
		restrict: 'EA',
		scope: {
			page: '=',
			publish: '&',
			delete: '&'
		},
		templateUrl: 'views/partials/postDetails.html',
		link: function (scope) {
			scope.queryCats = function (query) {
				return request.fetchCategories().then(function (res) {
					var cats = [];
					if (!scope.english) {
						cats = res.categories.es;
					} else {
						cats = res.categories.en;
					}
					return cats.filter(function (cat) {
						return cat.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
					});
				});
			};
			scope.queryTags = function (query) {
				return request.fetchTags().then(function (res) {
					var tags = [];
					if (!scope.english) {
						tags = res.blogTags.es;
					} else {
						tags = res.blogTags.en;
					}
					return tags.filter(function (tag) {
						return tag.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
					});
				});
			};
		}
	};
});
