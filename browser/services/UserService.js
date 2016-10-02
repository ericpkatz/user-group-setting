angular.module('app')
  .factory('UserService', function($http){
    return {
      update: function(user){
        return $http.put('/api/users/' + user.id, user);
      }
    };
  });
