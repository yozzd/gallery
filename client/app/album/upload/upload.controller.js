'use strict';

(function () {

    class UploadAlbumController {

        constructor(Restangular, $alert, Upload, $stateParams, blockUI) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.Upload = Upload;
            this.$stateParams = $stateParams;
            this.blockUI = blockUI;
        }

        $onInit() {
            this.Restangular.one('albums', this.$stateParams.id).get()
                .then(data => {
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

        uploadFiles(files) {
            this.blockUI.start('Please Wait...');
            this.files = files;
            if (this.files && this.files.length) {
                this.Upload.upload({
                        url: '/api/albums/images/' + this.$stateParams.id,
                        method: 'PUT',
                        file: this.files
                    })
                    .then(() => {
                        this.blockUI.stop();
                        this.$alert({
                            content: 'Image(s) has been upload successfully',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
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
    }

    angular.module('galleryApp')
        .controller('UploadAlbumController', UploadAlbumController);
})();
