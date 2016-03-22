'use strict';

(function () {

    function SavePage(request, $q) {

        var self = this;

        self.savePost = function (data, name) {
            var defer = $q.defer();

			function create () {
                request.name = name;
                data.post = self.page.id; //set relationship
                request.create(data).then(function (res) {
                    defer.resolve(res);
                }, function (err) {
                    defer.reject(err);
                });
            }
            function update () {
                request.name = name;
                request.update(data.id, data).then(function (res) {
                    defer.resolve(res);
                }, function (err) {
                    defer.reject(err);
                });
            }

            if (data.id) {update();} else {create();}

			return defer.promise;
        };

        return self;

    }

    angular.module('ezadmin')
        .service('savePage', ['request', '$q', SavePage]);
}());
