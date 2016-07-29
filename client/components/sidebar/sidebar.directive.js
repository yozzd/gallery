'use strict';

angular.module('galleryApp')
    .directive('sidebar', () => ({
        templateUrl: 'components/sidebar/sidebar.html',
        restrict: 'E',
        controller: 'SidebarController',
        controllerAs: 'sidenav'
    }));