'use strict';

angular.module('learnprogrammingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses', {
        templateUrl: 'app/courses/courses.html',
        controller: 'CoursesCtrl'
      })
      .when('/courses/:id',
            {
                templateUrl:'app/courses/view_course.html',
                controller: 'CourseDetailCtrl',
                authenticate: true

            })
      .when('/search',
            {
                templateUrl:'app/courses/search.html',
                controller: 'CoursesCtrl'

            })

  });
