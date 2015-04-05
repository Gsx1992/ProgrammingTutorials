
  'use strict';

angular.module('learnprogrammingApp')
      .factory('Course', ['$http', function($http){
       var api = {
     getCourses : function() {
           return $http.get('/api/courses')
     },
     addCourse : function(course) {
          return $http.post('/api/courses',course)
     },
  }
      
      return api
    }])
