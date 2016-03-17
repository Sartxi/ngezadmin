'use strict';

angular.module('ezadmin', [
    'appFilters',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'ui.interceptors',
    'ui.utils',
    'ui.bootstrap',
    'backand',
    'ngStorage',
    'angular.filter',
    'ngAnalytics',
    'ngFileUpload',
    'textAngular',
    'ngTagsInput'
])
.config(['$stateProvider','$httpProvider', '$urlRouterProvider', 'BackandProvider', '$provide',
    function($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider, $provide)
    {
        BackandProvider.setAnonymousToken('f8c1eb11-4b3b-4916-823a-2fd431ea277c');
        BackandProvider.setSignUpToken('e19b5a4d-f8b6-4dc7-b459-ad6517120dc2');

        $httpProvider.interceptors.push('httpInterceptor');

        $urlRouterProvider.otherwise('/pages');
        $stateProvider
        .state('login', {
            url: '/login',
            title: 'Login to NG-EZ Admin',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl as vm'
        })
        .state('analytics', {
            url: '/analytics',
            title: 'Snap Admin | Analytics',
            templateUrl: 'views/analytics.html',
            controller: 'AnalyticsCtrl as vm'
        })
        .state('pages', {
            url: '/pages',
            title: 'Snap Admin | Pages',
            templateUrl: 'views/pages.html',
            controller: 'PagesCtrl as vm'
        })
        .state('pages.page', {
            url: '/:id',
            title: 'Snap Admin | Page',
            views: {
                '@': {templateUrl: 'views/pages.page.html'}
            }
        })
        .state('blog', {
            url: '/blog',
            title: 'Snap Admin | Blog',
            templateUrl: 'views/blog.html',
            controller: 'BlogCtrl as vm'
        })
        .state('blog.page', {
            url: '/:id',
            title: 'Snap Admin | Blog Post',
            controller: 'PostCtrl as vm',
            views: {
                '@': {templateUrl: 'views/blog.post.html'}
            }
        })
        .state('lndPages', {
            url: '/landing-pages',
            title: 'Snap Admin | Landing Pages',
            templateUrl: 'views/lndpages.html',
            controller: 'LndPagesCtrl as vm'
        })
        .state('lndPages.page', {
            url: '/:id',
            title: 'Snap Admin | Landing Page',
            controller: 'LndPageCtrl as vm',
            views: {
                '@': {templateUrl: 'views/lndpages.page.html'}
            }
        })
        .state('settings', {
            url: '/setting',
            title: 'Snap Admin | Settings',
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl as vm'
        });

        $provide.decorator('taOptions', ['taRegisterTool', '$uibModal', '$delegate',
            function(taRegisterTool, $uibModal, taOptions)
            {

                taOptions.toolbar = [
                    ['h2', 'h3', 'h4', 'h5', 'p', 'quote'],
                    ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                    ['html', 'insertLink', 'insertVideo']
                ];

                taRegisterTool('imgGallery', {
                    iconclass: 'fa fa-picture-o',
                    action: function (deferred, restoreSelection) {
                        var textAngular = this;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            size: 'lg',
                            templateUrl: 'views/partials/imgGallery.html',
                            controller: 'ImgGalleryCtrl',
                            windowClass: 'normalModal'
                        });

                        modalInstance.result.then(function(res) {
                            restoreSelection();
                            textAngular.$editor().wrapSelection('insertHTML', res, true);
                            deferred.resolve();
                        });
                        return false;
                    },
                });
                taRegisterTool('layoutGallery', {
                    iconclass: 'fa fa-columns',
                    action: function (deferred, restoreSelection) {
                        var textAngular = this;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            size: 'lg',
                            templateUrl: 'views/partials/layoutGallery.html',
                            controller: 'layoutGalleryCtrl',
                            windowClass: 'normalModal'
                        });

                        modalInstance.result.then(function(res) {
                            restoreSelection();
                            textAngular.$editor().wrapSelection('insertHTML', res, true);
                            deferred.resolve();
                        });
                        return false;
                    },
                });
                taOptions.toolbar[0].push('layoutGallery');
                taOptions.toolbar[3].push('imgGallery');
                return taOptions;
            }
        ]);
    }
])
.run(['$state', '$sessionStorage', '$rootScope', '$location', 'ngAnalyticsService',
    function ($state, $sessionStorage, $rootScope, $location, ngAnalyticsService)
    {
        ngAnalyticsService.setClientId('971780513833-4h0rjkn5h7iqhkptnfh52s43m03j8574.apps.googleusercontent.com');
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.pageTitle = toState.title;
        });
    }
]);
