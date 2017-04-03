'use strict';

/**
 * @ngdoc function
 * @name apiFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apiFrontApp
 */
angular.module('apiFrontApp')
  .controller('MainCtrl', function () {
    var vm = this;

    vm.menuTemplate = {
      url: 'views/menu.html'
    }
  });
