'use strict';

(function () {

    class AdminListDepartementController {
        constructor(Restangular, $alert, $modal, blockUI) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$modal = $modal;
            this.blockUI = blockUI;
            this.init();
        }

        init() {
            this.blockUI.start();
            this.Restangular.all('departements').getList()
                .then(datas => {
                    this.blockUI.stop();
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
                templateUrl: 'app/admin/departement/add/add.html',
                controller: 'AdminAddDepartementController',
                controllerAs: 'add',
                show: false,
                onHide: () => {
                    this.init();
                }
            });
            modal.$promise.then(modal.show);
        }
    }

    angular.module('galleryApp.admin')
        .controller('AdminListDepartementController', AdminListDepartementController);
})();
