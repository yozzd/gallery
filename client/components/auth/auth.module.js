'use strict';

angular.module('galleryApp.auth', ['galleryApp.constants', 'galleryApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
