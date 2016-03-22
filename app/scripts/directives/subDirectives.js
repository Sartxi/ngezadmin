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
				request.name = 'blogCatagories';
				return request.getObjects().then(function (res) {
					var cats = res.data;
					return cats.filter(function (cat) {
						return cat.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
					});
				});
			};
			scope.queryTags = function (query) {
				request.name = 'blogTags';
				return request.getObjects().then(function (res) {
					var tags = res.data;
					return tags.filter(function (tag) {
						return tag.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
					});
				});
			};
			function createTag(tag, obj) {
				request.name = obj;
				request.create(tag);
			}
			scope.checkIt = function (tag, obj) {
				request.name = obj;
				request.getObjects().then(function (res) {
					var tags = res.data;
					return tags.filter(function (tg) {
						if (tg.text.toLowerCase().indexOf(tag.text.toLowerCase()) == -1) {
							createTag(tag, obj);
						}
					});
				});
			};
		}
	};
});
