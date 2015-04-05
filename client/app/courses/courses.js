'use strict';

angular.module('learnprogrammingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses', {
        templateUrl: 'app/courses/courses.html',
        controller: 'CoursesCtrl'
      });
  });
