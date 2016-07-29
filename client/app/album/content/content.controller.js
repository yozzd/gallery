'use strict';

(function () {

    class ContentAlbumController {
        constructor(Restangular, $alert, $stateParams, $modal, $scope) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$stateParams = $stateParams;
            this.$modal = $modal;
            this.$scope = $scope;
        }

        $onInit() {
            this.Restangular.one('albums', this.$stateParams.id).get()
                .then(data => {
                    let sort = _.orderBy(data.images, ['timestamp'], ['desc']);
                    data.images = [];
                    data.images = sort;
                    this.data = data;
                    this.data = data;
                }).catch(err => {
                    this.$alert({
                        content: err.data,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 5
                    });
                });
        }
    }

    angular.module('galleryApp').controller('ContentAlbumController', ContentAlbumController);
})();
