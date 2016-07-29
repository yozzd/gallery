'use strict';

(function () {

    class AdminAddDepartementController {
        constructor(Restangular, $alert, $scope) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$scope = $scope;
            this.init();
        }

        init() {
            this.Restangular.all('departements').getList()
                .then(datas => {
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

        submit(form) {
            this.submitted = true;
            if (form.$valid) {
                this.Restangular.all('departements').post({
                        name: this.data.name,
                        initial: this.data.initial,
                        group: this.datas.length + 1
                    })
                    .then(() => {
                        this.$alert({
                            content: 'Departement has created successfully',
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

    angular.module('galleryApp.admin')
        .controller('AdminAddDepartementController', AdminAddDepartementController);
})();
