'use strict';

class NavbarController {
    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isOperator = Auth.isOperator;
        this.isUser = Auth.isUser;
        this.getCurrentUser = Auth.getCurrentUser;
    }

}

angular.module('galleryApp')
    .controller('NavbarController', NavbarController);
