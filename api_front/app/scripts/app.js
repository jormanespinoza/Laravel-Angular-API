'use strict';

/**
 * @ngdoc overview
 * @name apiFrontApp
 * @description
 * # apiFrontApp
 *
 * Main module of the application.
 */
angular
  .module('apiFrontApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'authService',
    'googleplus'
  ])
  .config(function ($routeProvider, $authProvider, $locationProvider, GooglePlusProvider) {
    $locationProvider.hashPrefix('');
    $authProvider.loginUrl = 'http://localhost:8000/authLogin';
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
    GooglePlusProvider.setScopes('https://www.googleapis.com/auth/userinfo.email');
    GooglePlusProvider.init ({
      clientId: '929538698520-f4dran474ivnan0t96v4l36cal2f7or4.apps.googleusercontent.com',
      apiKey: 'GxNRdoNOVhaxOLZ8ngXsY_W0'
    });
  })
  .run(function ($rootScope, $location, authUser) {
    var privateRoutes = ['/', '/about'];

    $rootScope.$on('$routeChangeStart', function () {
      if (($.inArray($location.path(), privateRoutes) !== -1) && !authUser.isLoggedIn()) {
        toastr.error('Debe iniciar sesión para poder continuar.', 'Mensaje');
        $location.path('/login');
      }
    });
  });
