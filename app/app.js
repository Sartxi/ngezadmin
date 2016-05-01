'use strict';

angular.module('ezadmin', [
    'appFilters',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'ui.interceptors',
    'ui.utils',
    'angularUtils.directives.dirPagination',
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
        BackandProvider.setAnonymousToken('fef44aed-1c78-4bd3-80e7-2d2ada73384c');
        BackandProvider.setSignUpToken('45c0bed1-1227-4e24-8ae9-137be7f5efed');

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
            title: 'EZ Admin | Analytics',
            templateUrl: 'views/analytics.html',
            controller: 'AnalyticsCtrl as vm'
        })
        .state('pages', {
            url: '/pages',
            title: 'EZ Admin | Pages',
            templateUrl: 'views/pages.html',
            controller: 'PagesCtrl as vm'
        })
        .state('pages.page', {
            url: '/:id',
            title: 'EZ Admin | Page',
            views: {
                '@': {templateUrl: 'views/pages.page.html'}
            }
        })
        .state('blog', {
            url: '/blog',
            title: 'EZ Admin | Blog',
            templateUrl: 'views/blog.html',
            controller: 'BlogCtrl as vm'
        })
        .state('blog.post', {
            url: '/:id',
            title: 'EZ Admin | Blog Post',
            controller: 'PostCtrl as vm',
            views: {
                '@': {templateUrl: 'views/blog.post.html'}
            }
        })
        .state('lndPages', {
            url: '/landing-pages',
            title: 'EZ Admin | Landing Pages',
            templateUrl: 'views/lndpages.html',
            controller: 'LndPagesCtrl as vm'
        })
        .state('lndPages.lndpage', {
            url: '/:id',
            title: 'EZ Admin | Landing Page',
            controller: 'LndPageCtrl as vm',
            views: {
                '@': {templateUrl: 'views/lndpages.page.html'}
            }
        })
        .state('testimonials', {
            url: '/testimonials',
            title: 'EZ Admin | Testimonials',
            templateUrl: 'views/testimonials.html',
            controller: 'TestimonialsCtrl as vm'
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
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'quote'],
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
.run(['$state', '$sessionStorage', '$rootScope', '$location', 'ngAnalyticsService', '$anchorScroll',
    function ($state, $sessionStorage, $rootScope, $location, ngAnalyticsService, $anchorScroll)
    {
        ngAnalyticsService.setClientId('971780513833-4h0rjkn5h7iqhkptnfh52s43m03j8574.apps.googleusercontent.com');
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.pageTitle = toState.title;
            $anchorScroll();
        });
    }
]);
