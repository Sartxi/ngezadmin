'use strict';

(function () {

    function GrowlFactory ($rootScope, $timeout) {

		var growlFactory;

        $rootScope.alerts = [];
		$rootScope.staticAlerts = [];

        growlFactory = {
          	add: function (type, msg, timeout) {
				$rootScope.alerts = [];
          		if (timeout) {
		            $timeout(function () {
		                growlFactory.closeAlert(this);
		            }, timeout);
		        }
            	return $rootScope.alerts.push ({
              		type: type,
              		msg: msg,
              		close: function() {
                		return growlFactory.closeAlert(this);
              		}
            	});
        	},
			addStatic: function (type, msg, timeout) {
          		if (timeout) {
		            $timeout(function () {
		                growlFactory.closeStaticAlert(this);
		            }, timeout);
		        }
            	return $rootScope.staticAlerts.push ({
              		type: type,
              		msg: msg,
              		close: function() {
                		return growlFactory.closeStaticAlert(this);
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

        return growlFactory;

    }

    angular.module('ezadmin')
        .factory('growl', ['$rootScope', '$timeout', GrowlFactory]);
}());
