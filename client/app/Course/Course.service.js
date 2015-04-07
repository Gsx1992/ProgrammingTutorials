
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

     getCourse : function(course_id) {
        return $http.get('/api/courses/' + course_id )
     },

     addCourseComment : function(course_id, comment) {
          return $http.post('/api/courses/' + course_id + '/comments',
                            comment)
     },

     addCourseView : function(course_id) {
          return $http.post('/api/courses/' + course_id+ '/views')
     },

     deleteCourseComment : function(course_id, comment_id) {
          return $http.post('/api/courses/' + course_id+ '/comments/'+comment_id)
     },

     getUserComments : function(user_id) {
          return $http.get('/api/courses/' + user_id+ '/comments')
     }
  }
      
      return api
    }])
