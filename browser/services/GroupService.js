angular.module('app')
  .factory('GroupService', function($http){
    return {
      findAll: function(){
        return $http.get('/api/groups')
          .then(function(result){
            return result.data;
          });
      }
    };
  
  });
