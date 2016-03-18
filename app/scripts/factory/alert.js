'use strict';
(function () {

    function AlertService ($rootScope, $timeout) {

		var alertService;

        $rootScope.alerts = [];
		$rootScope.staticAlerts = [];

        alertService = {
          	add: function (type, msg, timeout) {
				$rootScope.alerts = [];
          		if (timeout) {
		            $timeout(function () {
		                alertService.closeAlert(this);
		            }, timeout);
		        }
            	return $rootScope.alerts.push ({
              		type: type,
              		msg: msg,
              		close: function() {
                		return alertService.closeAlert(this);
              		}
            	});
        	},
			addStatic: function (type, msg, timeout) {
          		if (timeout) {
		            $timeout(function () {
		                alertService.closeStaticAlert(this);
		            }, timeout);
		        }
            	return $rootScope.staticAlerts.push ({
              		type: type,
              		msg: msg,
              		close: function() {
                		return alertService.closeStaticAlert(this);
              		}
            	});
        	},
      		closeAlert: function(alert) {
		        return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
		    },
		    closeAlertIdx: function(index) {
		        return $rootScope.alerts.splice(index, 1);
		    },
			closeStaticAlert: function(alert) {
		        return this.closeStaticAlertIdx($rootScope.staticAlerts.indexOf(alert));
		    },
		    closeStaticAlertIdx: function(index) {
		        return $rootScope.staticAlerts.splice(index, 1);
		    }
        };

        return alertService;

    }

    angular.module('ezadmin')
        .factory('growl', ['$rootScope', '$timeout', AlertService]);
}());
