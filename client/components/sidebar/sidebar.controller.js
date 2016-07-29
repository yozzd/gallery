'use strict';

class SidebarController {
    constructor(Auth, $state) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isOperator = Auth.isOperator;
        this.isUser = Auth.isUser;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$state = $state;
    }

}

angular.module('galleryApp')
    .controller('SidebarController', SidebarController);