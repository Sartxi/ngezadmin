'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AnalyticsCtrl
     * @description
     * # AnalyticsCtrl
     * Analytics controller of the ngezadmin
     */


    function AnalyticsCtrl($rootScope) {
        var self = this;

        function init() {
            self.loading = false;
        }

        self.charts = [
            {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:date',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday'
                },
                chart: {
                    container: 'chart1',
                        type: 'LINE',
                    options: {
                        width: '100%',
                        fontSize: 14
                    }
                }
            },
            {
                reportType: 'ga',
                query: {
                    metrics: 'ga:bounces',
                    dimensions: 'ga:date',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday'
                },
                chart: {
                    container: 'chart2',
                    type: 'LINE',
                    options: {
                        width: '100%',
                        fontSize: 14
                    }
                }
            }
        ];
        self.browserChart = {
            reportType: 'ga',
            query: {
                metrics: 'ga:sessions',
                dimensions: 'ga:browser',
                'start-date': '30daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                container: 'chart3',
                type: 'PIE',
                options: {
                    is3D: true,
                    title: 'Browser Usage'
                }
            }
        };
        self.defaultIds = {
            ids: $rootScope.gViewID
        };

        init();
    }

    angular.module('ezadmin')
        .controller('AnalyticsCtrl', ['$rootScope', AnalyticsCtrl]);
})();
