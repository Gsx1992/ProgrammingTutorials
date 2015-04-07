'use strict';

angular.module('learnprogrammingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

      .when('/users/:id', {
        templateUrl: 'app/main/testPage.html',
        controller: 'MainCtrl'
      })
    
  });