'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:SettingsCtrl
     * @description
     * # SettingsCtrl
     * Settings controllers of the ngezadmin
     */


    function TestimonialsCtrl($state, request, $sessionStorage, $uibModal, growl) {
        var self = this;

		function init() {
            self.loading = true;
            getTestimonials();
        }

        function getTestimonials() {
            request.name = 'testimonials';
            request.getObjects().then(function (res) {
                self.testimonials = res.data;
                self.loading = false;
                getMerchTestimonials();
            });
        }

        function getMerchTestimonials() {
            request.name = 'merchTestimonials';
            request.getObjects().then(function (res) {
                self.merchtestimonials = res.data;
            });
        }

        self.create = function (testname) {
			var action = 'Create ';
			var testimonial;
            var newTestimonial = $uibModal.open({
                animation: true,
                templateUrl: 'views/partials/testimonial-editor.html',
                controller: 'TestEditCtrl',
                windowClass: 'normalModal',
				resolve: {
					testimonial: function () {
						return testimonial;
					},
					action: function () {
						return action;
					}
				}
            });

            newTestimonial.result.then(function (data) {
                request.name = testname;
                request.create(data).then(function (res) {
					growl.add('success', 'Testimonial Created', 3000);
                }, function (err) {
                    growl.add('danger', 'Could not create page', 3000);
                });
            });
        };
		self.update = function (testimonial, testname) {
			var action = 'Update ';
            var editTestimonial = $uibModal.open({
                animation: true,
                templateUrl: 'views/partials/testimonial-editor.html',
                controller: 'TestEditCtrl',
                windowClass: 'normalModal',
				resolve: {
					testimonial: function () {
						return testimonial;
					},
					action: function () {
						return action;
					}
				}
            });

            editTestimonial.result.then(function (data) {
                request.name = testname;
                request.update(data.id, data).then(function (res) {
					growl.add('success', 'Testimonial Updated', 3000);
                }, function (err) {
                    growl.add('danger', 'Could not create page', 3000);
                });
            });
        };

        init();
    }

	function TestEditCtrl($scope, $uibModalInstance, testimonial, action) {
		function init() {
			if (testimonial) {
				$scope.test = testimonial;
			}
			$scope.en = true;
			$scope.es = false;
		}

		$scope.btntext = action + 'Testimonial';
        $scope.openDatePicker = function() {
            $scope.datePicker = true;
        };
        $scope.dateOptions = {
            showWeeks: false
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.ok = function (name) {
            $uibModalInstance.close(name);
        };
		 init();
	}

    angular.module('ezadmin')
        .controller('TestimonialsCtrl', ['$state', 'request', '$sessionStorage', '$uibModal', 'growl', TestimonialsCtrl])
		.controller('TestEditCtrl', ['$scope', '$uibModalInstance', 'testimonial', 'action', TestEditCtrl]);
})();
