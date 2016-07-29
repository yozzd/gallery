'use strict';

angular.module('galleryApp.admin')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '@': {
                        templateUrl: 'app/admin/home/home.html',
                        controller: 'AdminHomeController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('admin.departement', {
                url: '/departement',
                views: {
                    '@': {
                        templateUrl: 'app/admin/departement/list/list.html',
                        controller: 'AdminListDepartementController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('admin.operator', {
                url: '/operator',
                views: {
                    '@': {
                        templateUrl: 'app/admin/operator/list/list.html',
                        controller: 'AdminListOperatorController',
                        controllerAs: 'vm'
                    }
                }
            });
    });
