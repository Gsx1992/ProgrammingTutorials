'use strict';
    angular.module('learnprogrammingApp')
      .controller('CoursesCtrl', ['$scope','Course','Auth', 
           function($scope,Course, Auth) {
$scope.max = 5;
$scope.order = "-views";
$scope.isReadonly = true;
$scope.show = false;  
$scope.isAdmin = Auth.isAdmin;




Course.getCourses().success(function(data){
$scope.courses = data
 }) 

$scope.showCreate = function(){
    if($scope.show){
      $scope.show = false;
    }
    else{
      $scope.show = true;
    }

  }


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

    

    

  
    }]);
