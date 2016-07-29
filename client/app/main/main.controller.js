'use strict';

(function () {

    class MainController {

        constructor(Restangular, $alert, $timeout, $document) {
            this.Restangular = Restangular;
            this.$alert = $alert;
            this.$timeout = $timeout;
            this.$document = $document;
            this.look = _.sample([{
                title: 'Hanging Out',
                img: 'hangingout.png'
            }, {
                title: 'Jam Session',
                img: 'jamsession.png'
            }, {
                title: 'Night Shift',
                img: 'nightshift.png'
            }, {
                title: 'So Light',
                img: 'solight.png'
            }, {
                title: 'When I Grow Up',
                img: 'whenigrowup.png'
            }]);
            this.init();
            this.limit = 5;
        }

        init() {
            this.Restangular.all('albums').getList()
                .then(datas => {
                    this.arr = [];
                    _.each(datas, data => {
                        _.map(data.images, map => {
                            this.arr.push({
                                id: data._id,
                                pid: map._id,
                                name: map.name,
                                title: map.title,
                                timestamp: map.timestamp,
                                by: map.by,
                                initial: map.initial
                            });
                        });
                    });
                    this.latest = _.orderBy(this.arr, ['timestamp'], ['desc']);
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

        more() {
            this.load = true;
            this.$timeout(() => {
                this.limit = this.limit + 5;
                if (this.limit > this.latest.length || this.latest.length - this.limit < 1) {
                    this.disabled = true;
                }
                this.load = false;
            }, 2000);
        }
    }

    angular.module('galleryApp')
        .controller('MainController', MainController);
})();
