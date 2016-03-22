'use strict';

(function () {

    function SavePage(request, $q) {

        var self = this;

        self.storeOrgs = function (orgs, name, content) {
            //check if exists
            var exists = function (newob, arr) {
                var result = false;
                angular.forEach(arr, function(obj) {
                    if (obj.text.toLowerCase().indexOf(newob.text.toLowerCase()) > -1) {
                        result = true;
                    }
                });
                return result;
            }
            if (orgs.hasOwnProperty('catagories')) {
                var exCats = content.catagories;
                angular.forEach(orgs.catagories, function (cat) {
                    if (!exists(cat, exCats)) {
                        var data = {text: cat.text}
                        if (name === 'enContent') {data.enContentId = content.id}
                        if (name === 'esContent') {data.esContentId = content.id}
                        request.name = 'postCatagories';
                        request.create(data);
                    }
                });
            }
            if (orgs.hasOwnProperty('tags')) {
                var exTags = content.tags;
                angular.forEach(orgs.tags, function (tag) {
                    if (!exists(tag, exTags)) {
                        var data = {text: tag.text}
                        if (name === 'enContent') {data.enContentId = content.id}
                        if (name === 'esContent') {data.esContentId = content.id}
                        request.name = 'postTags';
                        request.create(data);
                    }
                });
            }
        }

        self.save = function (data, params, orgs) {
            var defer = $q.defer();

            //set obj name
            request.name = params.name;

            // Create/Update Post Content
			function createContent () {
                //set relationship
                if (params.type === 'lndPage') {
                    data.lndPage = params.pageId;
                } else if (params.type === 'post') {
                    data.post = params.pageId;
                } else {
                    data.page = params.pageId;
                }
                request.create(data).then(function (res) {
                    if (orgs) {
                        self.storeOrgs(orgs, params.name, res);
                    }
                    defer.resolve(res);
                }, function (err) {
                    defer.reject(err);
                });
            }
            function updateContent () {
                request.update(data.id, data).then(function (res) {
                    if (orgs) {
                        self.storeOrgs(orgs, params.name, data);
                    }
                    defer.resolve(res);
                }, function (err) {
                    defer.reject(err);
                });
            }

            //check if post exists and act accordingly
            if (data && data.hasOwnProperty('id')) {
                updateContent();
            } else {
                createContent();
            }

			return defer.promise;
        };

        return self;

    }

    angular.module('ezadmin')
        .service('savePage', ['request', '$q', SavePage]);
}());
