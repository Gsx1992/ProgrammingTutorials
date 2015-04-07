'use strict';

angular.module('learnprogrammingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses/:course_id/comments', {
        templateUrl: 'app/comments/comments.html',
        controller: 'CommentsCtrl'
      });
  });
