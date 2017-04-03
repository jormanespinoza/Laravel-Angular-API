'use strict'

angular.module('apiFrontApp')

  .controller('LoginCtrl', function (authUser) {
    var vm = this;
    vm.loginForm = {
      email: '',
      password: ''
    };

    vm.login = function () {
      authUser.loginApi(vm.loginForm);
    }

    vm.loginGooglePlus = function () {
      authUser.loginGooglePlus();
    }
  });
