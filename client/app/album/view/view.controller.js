'use strict';

(function () {

    class ViewImageController {

        constructor(Restangular, Auth, $alert, $stateParams) {
            this.Restangular = Restangular;
            this.isOperator = Auth.isOperator;
            this.$alert = $alert;
            this.$stateParams = $stateParams;
            this.id = this.$stateParams.id;
            this.init();
        }

        init() {
            this.Restangular.one('albums', this.$stateParams.id).get()
                .then(data => {
                    let sort = _.orderBy(data.images, ['timestamp'], ['desc']);
                    data.images = [];
                    data.images = sort;
                    this.data = data;
                    this.index = _.chain(this.data.images).map(val => {
                        return val._id;
                    }).indexOf(this.$stateParams.pid).value();
                    this.view = this.data.images[this.index];

                    if (this.index === 0) {
                        this.pidnext = this.data.images[this.index + 1]._id;
                    } else if (this.index === this.data.images.length - 1) {
                        this.pidprev = this.data.images[this.index - 1]._id;
                    } else {
                        this.pidprev = this.data.images[this.index - 1]._id;
                        this.pidnext = this.data.images[this.index + 1]._id;
                    }

                    /*if (this.index === 0 || this.index === 1) {
                        this.slider = [];
                        for (let i = 0; i < 5; i++) {
                            this.slider.push(this.data.images[i]);
                        }
                    } else if ((this.data.images.length - 1) - this.index === 0 || (this.data.images.length - 1) - this.index === 1) {
                        this.slider = [];
                        for (let i = this.data.images.length - 5; i < this.data.images.length; i++) {
                            this.slider.push(this.data.images[i]);
                        }
                    } else {
                        this.slider = [];
                        for (let i = this.index - 2; i < 5 + this.index - 2; i++) {
                            this.slider.push(this.data.images[i]);
                        }
                    }

                    if (this.index === 0 || this.index === 1 || this.index === 2) {
                        this.phide = true;
                    } else if ((this.data.images.length - 1) - this.index === 0 || (this.data.images.length - 1) - this.index === 1 || (this.data.images.length - 1) - this.index === 2) {
                        this.nhide = true;
                    }*/

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

        /*pslider() {
            this.nhide = false;
            let first = _.head(this.slider);
            if (first !== undefined) {
                this.idx = _.chain(this.data.images).map(val => {
                    return val._id;
                }).indexOf(first._id).value();

                if (this.idx === 0 || this.idx === 1) {
                    this.slider = [];
                    for (let i = 0; i < 5; i++) {
                        this.slider.push(this.data.images[i]);
                    }
                } else {
                    this.slider = [];
                    for (let i = this.idx - 1; i < 5 + this.idx - 1; i++) {
                        this.slider.push(this.data.images[i]);
                    }
                }
            }
        }

        nslider() {
            this.phide = false;
            let last = _.last(this.slider);
            if (last !== undefined) {
                this.idx = _.chain(this.data.images).map(val => {
                    return val._id;
                }).indexOf(last._id).value();

                if ((this.data.images.length - 1) - this.idx === 0 || (this.data.images.length - 1) - this.idx === 1) {
                    this.slider = [];
                    for (let i = this.data.images.length - 5; i < this.data.images.length; i++) {
                        this.slider.push(this.data.images[i]);
                    }
                } else {
                    this.slider = [];
                    for (let i = this.idx - 3; i < 5 + this.idx - 3; i++) {
                        this.slider.push(this.data.images[i]);
                    }
                }
            }
        }*/
    }

    angular.module('galleryApp')
        .controller('ViewImageController', ViewImageController);
})();
