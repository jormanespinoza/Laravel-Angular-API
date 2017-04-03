'use strict';

angular.module('authService', [])

  .factory('sessionControl', function () {
    return {
      get: function (key) {
        return sessionStorage.getItem(key);
      },
      set: function (key, val) {
        return sessionStorage.setItem(key, val);
      },
      unset: function (key) {
        return sessionStorage.removeItem(key);
      }
    };
  })
  .factory('authUser', function ($auth, sessionControl, $location) {
    var cacheSession = function (email, username, avatar) {
      sessionControl.set('userIsLogin', true);
      sessionControl.set('email', email);
      sessionControl.set('username', username);
      sessionControl.set('avatar', avatar);
    };

    var unCacheSession = function () {
      sessionControl.unset('userIsLogin');
      sessionControl.unset('email');
      sessionControl.unset('username');
      sessionControl.unset('avatar');
    };

    var login = function (loginForm) {
      $auth.login(loginForm).then(
        function (response) {
          cacheSession(
            response.data.user.email,
            response.data.user.name,
            loginForm.avatar
          )
          $location.path('/');
          toastr.success('Sesión iniciada con éxito.', 'Mensaje');
          // console.log(response);
        },
        function (error) {
          unCacheSession();
          toastr.error(error.data.error, 'Error');
          // console.log(error);
        }
      );
    };

    return {
      loginApi: function (loginForm) {
        login(loginForm);
      },
      isLoggedIn: function () {
        return sessionControl.get('userIsLogin') !== null;
      },
      logout: function () {
        $auth.logout();
        unCacheSession();
        toastr.success('Sesión cerrada con éxito', 'Mensaje');
        $location.path('/login');
      }
    };
  });
