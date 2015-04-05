'use strict';
    angular.module('learnprogrammingApp')
      .controller('CoursesCtrl', ['$scope','Course', 'Auth', 
           function($scope,Course, Auth) {

            console.log(Auth.getCurrentUser()._id)

           	$scope.isReadonly = true;
  			 $scope.max = 5;
           	Course.getCourses().success(function(data){
    		$scope.courses = data
 			 }) 

    $scope.addCourse = function(course){
    var course = {
      title: $scope.newCourse.title,
      rate: 0,
      language: $scope.newCourse.language,
      youtube: "https://www.youtube.com/embed/"+$scope.newCourse.youtube,
      description: $scope.newCourse.description,
      difficulty: $scope.newCourse.difficulty,
      views: 0
    }

    Course.addCourse(course)
          .success(function(added_course) {
             $scope.courses.push(added_course);
             $scope.newCourse = { }
          });

  }
    }])
