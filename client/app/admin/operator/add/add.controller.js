'use strict';

(function () {

    class AdminAddOperatorController {
        constructor(Restangular, $alert, $scope) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$scope = $scope;
            this.init();
            this.departement = {};
        }

        init() {
            this.Restangular.all('departements').getList()
                .then(datas => {
                    this.departements = datas;
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
                this.Restangular.all('users').post({
                        departement: this.departement.selected.name,
                        initial: this.departement.selected.initial,
                        group: this.departement.selected.group,
                        name: this.data.fullname,
                        email: this.data.username,
                        password: this.data.password,
                        role: 'operator'
                    })
                    .then(() => {
                        this.$alert({
                            content: 'Operator has created successfully',
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
        .controller('AdminAddOperatorController', AdminAddOperatorController);
})();
