angular.module('app')
  .factory('AuthService', function($http){

    var _user = {};
    return {
      user: _user,
      logout: function(){
        return $http.delete('/api/sessions')
          .then(function(result){
            angular.copy({}, _user);
            return _user;
          });
      },
      login: function(credentials){
        return $http.post('/api/sessions', credentials)
          .then(function(result){
            angular.copy(result.data, _user);
            return _user;
          });
      },
      me: function(){
        return $http.get('/api/sessions')
          .then(function(result){
            angular.copy(result.data, _user);
            return _user;
          });
      }
    };
  })
  .run(function(AuthService){
    AuthService.me();
  
  });

