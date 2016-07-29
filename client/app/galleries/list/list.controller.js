'use strict';

(function () {

    class GalleriesListController {

        constructor(Restangular, $alert) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.init();
        }

        init() {
            this.Restangular.all('albums').getList()
                .then(datas => {
                    _.each(datas, val => {
                        let sort = _.orderBy(val.images, ['timestamp'], ['desc']);
                        val.images = [];
                        val.images = sort;
                    });
                    this.datas = datas;
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
        .controller('GalleriesListController', GalleriesListController);
})();
