
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

     deleteCourse : function(id) {
          return $http.delete('/api/courses/'+id)
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
     },

     addViewedCourse : function(user_id, course_id) {
          return $http.post('/api/users/' + user_id+ '/course/'+ course_id)
     },

     getViewedCourses : function(user_id) {
          return $http.get('/api/users/' + user_id+ '/views')
     },

     addReply : function(course_id, comment_id, reply) {
          return $http.post('/api/courses/' + course_id+ '/comments/'+comment_id+'/replies', reply )
     }
  }
      
      return api
    }])
