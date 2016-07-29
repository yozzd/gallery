'use strict';

(function () {

    class ListAlbumController {

        constructor(Restangular, $alert, $modal, blockUI, $confirm) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$modal = $modal;
            this.blockUI = blockUI;
            this.$confirm = $confirm;
            this.init();
        }

        init() {
            this.blockUI.start();
            this.Restangular.all('albums/find/bygroup').getList()
                .then(datas => {
                    this.blockUI.stop();
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

        add() {
            let modal = this.$modal({
                templateUrl: 'app/album/add/add.html',
                controller: 'AddAlbumController',
                controllerAs: 'add',
                show: false,
                onHide: () => {
                    this.init();
                }
            });
            modal.$promise.then(modal.show);
        }

        confirm(id) {
            this.$confirm.show('<span class="fa fa-exclamation-triangle"></span> WARNING!!!', 'Are you sure you want to delete this album?<br/>You will lose all your image(s)!')
                .then(choice => {
                    if (choice === 'y') {
                        return this.Restangular.one('albums', id).remove()
                            .then(() => {
                                this.$alert({
                                    content: 'Album has been deleted successfully',
                                    placement: 'top-right',
                                    type: 'info',
                                    duration: 5
                                });
                            }).catch(err => {
                                this.$alert({
                                    content: err.data,
                                    placement: 'top-right',
                                    type: 'danger',
                                    duration: 5
                                });
                            });
                    }
                })
                .then(() => {
                    this.init();
                });
        }
    }

    angular.module('galleryApp')
        .controller('ListAlbumController', ListAlbumController);
})();
