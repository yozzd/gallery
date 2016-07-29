'use strict';

(function () {

    class AddAlbumController {

        constructor(Auth, Restangular, $alert, $scope) {
            this.getCurrentUser = Auth.getCurrentUser;
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$scope = $scope;
        }

        submit(form) {
            this.submitted = true;
            if (form.$valid) {
                this.Restangular.all('albums').post({
                        name: this.data.name
                    })
                    .then(() => {
                        this.$alert({
                            content: 'Album has created successfully',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        this.$scope.$hide();
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
        .controller('AddAlbumController', AddAlbumController);
})();
