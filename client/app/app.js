'use strict';

angular.module('learnprogrammingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.gravatar'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**'
  ]);

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .filter('unique', function() {
 return function(collection, keyname) {
  var output = [];
  var keys = [];

  angular.forEach(collection, function(item) {
    var key = item[keyname];
    if(keys.indexOf(key) === -1) {
      keys.push(key);
      output.push(item);
    }
  });
  return output;
};
})

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });