angular.module('app')
  .directive('appNav', function(){
    return {
      templateUrl: '/browser/templates/appNav.html',
      controller: function($scope, AuthService, $state){
        $scope.user = AuthService.user;
        $scope.logout = function(){
          AuthService.logout()
            .then(function(){
              $state.go('home');
            });
        
        };
      }
    };
  });
