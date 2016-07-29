'use strict';

(function () {

    function confirmService($modal, $rootScope, $q) {
        var scope = $rootScope.$new();
        var deferred;

        var confirm = $modal({
            templateUrl: 'components/confirmation/confirmation.html',
            scope: scope,
            show: false
        });
        var parentShow = confirm.show;
        confirm.show = function (title, content) {
            scope.title = title;
            scope.content = content;
            deferred = $q.defer();
            parentShow();
            return deferred.promise;
        };

        scope.answer = function (res) {
            deferred.resolve(res);
            confirm.hide();
        };

        return confirm;
    }

    angular.module('galleryApp')
        .service('$confirm', confirmService);
})();
