'use strict';

angular.module('galleryApp').config(function ($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            views: {
                '@': {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Home'
            }
        })
        .state('main.album', {
            url: 'album',
            views: {
                '@': {
                    templateUrl: 'app/album/list/list.html',
                    controller: 'ListAlbumController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Album'
            }
        })
        .state('main.album.content', {
            url: '/content/{id}',
            views: {
                '@': {
                    templateUrl: 'app/album/content/content.html',
                    controller: 'ContentAlbumController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Content Album'
            }
        })
        .state('main.album.content.upload', {
            url: '/upload',
            views: {
                '@': {
                    templateUrl: 'app/album/upload/upload.html',
                    controller: 'UploadAlbumController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Upload Image'
            }
        })
        .state('main.album.content.view', {
            url: '/view/{pid}',
            views: {
                '@': {
                    templateUrl: 'app/album/view/view.html',
                    controller: 'ViewImageController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'View Image'
            }
        })
        .state('main.galleries', {
            url: 'galleries',
            views: {
                '@': {
                    templateUrl: 'app/galleries/list/list.html',
                    controller: 'GalleriesListController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('main.galleries.view', {
            url: '/view/{id}',
            views: {
                '@': {
                    templateUrl: 'app/galleries/view/view.html',
                    controller: 'GalleriesViewController',
                    controllerAs: 'vm'
                }
            }
        });
});
