'use strict';
    angular.module('learnprogrammingApp')
      .controller('CourseDetailCtrl', ['$scope','Course', 'Auth','$routeParams', 
           function($scope,Course, Auth, $routeParams) {
            $scope.isAdmin = Auth.isAdmin;
        $scope.showEdit = false;
        Course.getCourse($routeParams.id).success(function(data){
    		$scope.course = data
    		$scope.comments = data.comments
 			 }) 

        Course.addCourseView($routeParams.id)
          .success(function(updated_course) {
            $scope.course = updated_course
          })

$scope.isReadonly = true;

        $scope.postComment = function(){

   $scope.date = new Date();
   var comment = {
    UID: Auth.getCurrentUser()._id,
    email: Auth.getCurrentUser().email,
    name: Auth.getCurrentUser().name,
    rate: $scope.newComment.rate,
    post: $scope.newComment.post,
    created_at: $scope.date,
    course_id: $routeParams.id
  }
   Course.addCourseComment($routeParams.id, comment)
                .success(function(added_comment) {
                    $scope.comments.push(added_comment)
                    $scope.comment = {} ;   
                })

   $scope.newComment = {}

 }

 $scope.deleteComment = function(_id, index){

    $scope.comments.splice(index, 1)
    Course.deleteCourseComment($scope.course._id, _id)
                .success(function(added_comment) {
                    
                })
  }



        
        

  }])
