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
.directive('lndPgDetails', function () {
	return {
		restrict: 'EA',
		scope: {
			dynamic: '=',
			page: '=',
			publish: '&',
			delete: '&'
		},
		templateUrl: 'views/partials/lndPageDetails.html',
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
			orgs: '=',
			publish: '&',
			delete: '&'
		},
		templateUrl: 'views/partials/postDetails.html',
		link: function (scope, elem, attrs) {
			elem.on('submit', function () {
				scope.details.$setPristine();
			});
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
			//creates tags/catagories
			function createTag(newTag, name) {
				request.name = name;
				request.create(newTag);
			}
			scope.exists = function (newTag, name) {
				request.name = name;
				request.getObjects().then(function (res) {
					var tags = res.data;
					var existingTag = function () {
						var result = false;
						var nt = newTag.text.toLowerCase();
						angular.forEach(tags, function(tag) {
							if (tag.text.toLowerCase().indexOf(nt) > -1) {
								result = true;
							}
						});
						return result;
					}
					// if tag doesnt exist create one
					if (!existingTag()) {
						createTag(newTag, name);
					}
				});
			};
			scope.deleteOrgs = function (id, name) {
				request.name = name;
				request.delete(id);
				scope.publish();
			}
		}
	};
});
