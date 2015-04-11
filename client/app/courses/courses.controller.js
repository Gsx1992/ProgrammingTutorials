'use strict';
    angular.module('learnprogrammingApp')
      .controller('CoursesCtrl', ['$scope','Course','Auth', 
           function($scope,Course, Auth) {
$scope.max = 5;
$scope.order = "-views";
$scope.isReadonly = true;
$scope.show = false;  
$scope.isAdmin = Auth.isAdmin;
$scope.viewedCourses = null;


Course.getCourses().success(function(data){
$scope.courses = data
 }) 

if(Auth.isLoggedIn() == true){
  Course.getViewedCourses(Auth.getCurrentUser()._id).success(function(data){
      $scope.viewedCourses = data
})
}


$scope.showCreate = function(){
    if($scope.show){
      $scope.show = false;
    }
    else{
      $scope.show = true;
    }

  }

  $scope.delete = function(course_id, index){
    $scope.courses.splice(index, 1)
    Course.deleteCourse(course_id)
                .success(function() {

                })
  }

  $scope.deleteCourse = function(course_id, index){
    if($scope.show){
      $scope.show = false;
    }
    else{
      $scope.show = true;
    }

  }

  $scope.viewedCourse = function(course_id){
    if($scope.viewedCourses != null){
      for(var i = 0; i < $scope.viewedCourses.length; i++){
        if(course_id == $scope.viewedCourses[i]){
          return true;
        }
      }
    }
  return false;
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
