'use strict';

(function () {

    class AdminListOperatorController {
        constructor(Restangular, $alert, $modal, blockUI) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$modal = $modal;
            this.blockUI = blockUI;
            this.init();
        }

        init() {
            this.blockUI.start();
            this.Restangular.all('users').getList()
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
                templateUrl: 'app/admin/operator/add/add.html',
                controller: 'AdminAddOperatorController',
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
        .controller('AdminListOperatorController', AdminListOperatorController);
})();
