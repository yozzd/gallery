'use strict';

(function () {

    class AdminHomeController {
        /*constructor(User) {
            this.users = User.query();
        }

        delete(user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        }*/
        constructor(Restangular, $alert) {
            this.Restangular = Restangular;
            this.$alert = $alert;
        }

        $onInit() {
            this.Restangular.all('albums').getList()
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
    }

    angular.module('galleryApp.admin')
        .controller('AdminHomeController', AdminHomeController);
})();
