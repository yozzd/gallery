'use strict';

angular.module('galleryApp', [
        'ui.router',
        'permission',
        'permission.ui',
        'galleryApp.auth',
        'galleryApp.admin',
        'galleryApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'validation.match',
        'restangular',
        'mgcrea.ngStrap',
        'ngAnimate',
        'ncy-angular-breadcrumb',
        'ngFileUpload',
        'ui.select',
        'blockUI',
        'duScroll'
    ])
    .config(function ($urlRouterProvider, $locationProvider, RestangularProvider, blockUIConfig, uiSelectConfig) {
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('/');
        });

        $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setDefaultHttpFields({
            cache: false
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation) {
            if (operation === 'remove') {
                return undefined;
            }
            return elem;
        });

        blockUIConfig.delay = 0;
        blockUIConfig.autoBlock = false;

        uiSelectConfig.theme = 'select2';
    });
