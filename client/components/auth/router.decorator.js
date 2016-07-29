'use strict';

(function () {

    angular.module('galleryApp.auth')
        .run(function ($rootScope, $state, Auth, PermissionStore, $q) {
            // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if (!next.authenticate) {
                    return;
                }

                if (typeof next.authenticate === 'string') {
                    Auth.hasRole(next.authenticate, _.noop)
                        .then(has => {
                            if (has) {
                                return;
                            }

                            event.preventDefault();
                            return Auth.isLoggedIn(_.noop)
                                .then(is => {
                                    $state.go(is ? 'main' : 'login');
                                });
                        });
                } else {
                    Auth.isLoggedIn(_.noop)
                        .then(is => {
                            if (is) {
                                return;
                            }

                            event.preventDefault();
                            $state.go('main');
                        });
                }
            });

            PermissionStore.definePermission('admin', () => {
                var deferred = $q.defer();
                Auth.getCurrentUser(data => {
                    if (data.role === 'admin') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            });

            PermissionStore.definePermission('operator', () => {
                var deferred = $q.defer();
                Auth.getCurrentUser(data => {
                    if (data.role === 'operator') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            });

            PermissionStore.definePermission('user', () => {
                var deferred = $q.defer();
                Auth.getCurrentUser(data => {
                    if (data.role === 'user') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            });

            PermissionStore.definePermission('guest', () => {
                var deferred = $q.defer();
                Auth.getCurrentUser(data => {
                    if (!data.role) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            });
        });
})();