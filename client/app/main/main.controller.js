'use strict';

angular.module('learnprogrammingApp')
  .controller('MainCtrl', ['$scope','Course','Auth', '$routeParams', '$route',
    function ($scope,Course, Auth, $routeParams, $route) {

      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.name = Auth.getCurrentUser().name;
      $scope.isReadonly = true;
      $scope.isEmpty = true;
      var route;

      if($route.current.templateUrl == "app/main/testPage.html"){
    	route = $routeParams.id
  		}

  		else{
  			route = Auth.getCurrentUser()._id
  		}

      Course.getUserComments(route).success(function(data){
      	if(data.length > 0){
			$scope.isEmpty = false
		}
		$scope.comments = data

 }) 
    
  }]);
