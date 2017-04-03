'use strict';

/**
 * @ngdoc function
 * @name apiFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the apiFrontApp
 */
angular.module('apiFrontApp')
  .controller('AboutCtrl', function () {
    var vm = this;

    vm.menuTemplate = {
      url: 'views/menu.html'
    }
  });
