'use strict';

(function () {

    function Request($http, $q, Backand) {

        var self = this;
        var baseUrl = '/1/objects/';

        self.name = null;

        self.getObjects = function () {
            var defer = $q.defer();

            $http.get(Backand.getApiUrl() + baseUrl + self.name)
			.success(function (res) {
				defer.resolve(res);
			})
			.error(function (err) {
				defer.reject(err);
			});

			return defer.promise;
        };

        self.getObject = function (id) {
            var defer = $q.defer();

            $http.get(Backand.getApiUrl() + baseUrl + self.name + '/' + id, {
                params: {deep: true, exclude: 'metadata,totalRows'}
            })
			.success(function (res) {
				defer.resolve(res);
			})
			.error(function (err) {
				defer.reject(err);
			});

			return defer.promise;
        }

        self.create = function (data) {
            return $http({
                method: 'POST',
                url : Backand.getApiUrl() + baseUrl + self.name,
                data: data,
                params: {
                    returnObject: true
                }
            }).then(function(response) {
                return response.data;
            });
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url : Backand.getApiUrl() + baseUrl + self.name + '/' + id,
                data: data,
                params: {
                    returnObject: true
                }
            }).then(function(response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : Backand.getApiUrl() + baseUrl + self.name + '/' + id
            });
        };

        self.logout = function(){
            Backand.signout();
        };

        return self;

    }

    angular.module('ezadmin')
        .service('request', ['$http', '$q', 'Backand', Request]);
}());
