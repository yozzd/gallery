'use strict';

(function () {

    class GalleriesViewController {

        constructor(Restangular, $alert, $stateParams) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$stateParams = $stateParams;
            this.init();
        }

        init() {
            this.Restangular.one('albums', this.$stateParams.id).get()
                .then(data => {
                    let sort = _.orderBy(data.images, ['timestamp'], ['desc']);
                    data.images = [];
                    data.images = sort;
                    this.data = data;
                })
                .catch(err => {
                    this.$alert({
                        content: err.data,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 5
                    });
                });
        }
    }

    angular.module('galleryApp')
        .controller('GalleriesViewController', GalleriesViewController);
})();
