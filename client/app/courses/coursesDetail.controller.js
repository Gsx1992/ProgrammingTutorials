'use strict';
    angular.module('learnprogrammingApp')
      .controller('CourseDetailCtrl', ['$scope','Course', 'Auth','$routeParams', 
           function($scope,Course, Auth, $routeParams) {
        $scope.showEdit = false;
        Course.getCourse($routeParams.id).success(function(data){
    		$scope.course = data
 			 }) 

        
        

  }])
