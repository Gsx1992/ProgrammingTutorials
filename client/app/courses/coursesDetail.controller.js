'use strict';
    angular.module('learnprogrammingApp')
      .controller('CourseDetailCtrl', ['$scope','Course', 'Auth','$routeParams', 
           function($scope,Course, Auth, $routeParams) {
            $scope.isAdmin = Auth.isAdmin;
        $scope.showEdit = false;
        Course.getCourse($routeParams.id).success(function(data){
    		$scope.course = data
        $scope.allReplies = []
    		$scope.comments = data.comments
        for(var i = 0; i< $scope.comments.length; i++){
          for(var z = 0; z < $scope.comments[i].replies.length; z++){
          if($scope.comments[i].replies[z]){
            $scope.allReplies.push($scope.comments[i].replies[z])
          }
        }
      }
    })

      


        Course.addViewedCourse(Auth.getCurrentUser()._id, $routeParams.id).success(function() {
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

 $scope.postReply = function(comment_id_in, commentReply){
   $scope.date = new Date();
   var reply = {
    UID: Auth.getCurrentUser()._id,
    email: Auth.getCurrentUser().email,
    name: Auth.getCurrentUser().name,
    post: commentReply,
    created_at: $scope.date,
    course_id: $routeParams.id,
    comment_id: comment_id_in
  }
   Course.addReply($routeParams.id, comment_id_in, reply)
                .success(function(added_reply) {
                })

                $scope.allReplies.push(reply);


 }


 $scope.deleteComment = function(_id, index){
    $scope.comments.splice(index, 1)
    Course.deleteCourseComment($scope.course._id, _id)
                .success(function(added_comment) {
                    
                })
  }



        
        

  }])
