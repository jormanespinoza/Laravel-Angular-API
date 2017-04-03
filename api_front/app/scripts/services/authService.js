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
  .factory('authUser', function ($auth, GooglePlus, sessionControl, $location) {
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
          if ((typeof response.data.user.email != 'undefined') && typeof (response.data.user.name != 'undefined')) {
            cacheSession(response.data.user.email, response.data.user.name, loginForm.avatar)
          }

          $location.path('/');
          toastr.success('Sesión iniciada con éxito.', 'Mensaje');
          // console.log(response);
        },
        function (error) {
          unCacheSession();
          if (error.data.error == 'Invalid credentials') {
            toastr.error('Usuario o contraseña incorrectos', 'Error');
          }else {
            toastr.error(error.data.error, 'Error');
          }
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
      loginGooglePlus: function () {
        GooglePlus.login().then(
          function () {
            GooglePlus.getUser().then(function(response) {
              // console.log(response);
              var loginForm = {
                name: response.name,
                email: response.email,
                avatar: response.picture
              }

              login(loginForm);
            })
          }
        );
      },
      logout: function () {
        $auth.logout();
        unCacheSession();
        toastr.success('Sesión cerrada con éxito', 'Mensaje');
        $location.path('/login');
      }
    };
  });
