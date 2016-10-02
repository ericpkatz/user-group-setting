angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/browser/templates/home.html'
      })
      .state('settings', {
        resolve: {
          groups: function(GroupService){
            return GroupService.findAll();
          },
          selectedGroupId: function(AuthService, $state){
            return AuthService.me()
              .then(function(user){
                return user.groupId;
              })
              .catch(function(){
                $state.go('home');
              });
          }
        },
        url: '/settings',
        templateUrl: '/browser/templates/settings.html',
        controller: function(AuthService, $scope, groups, selectedGroupId, $state, UserService){
          $scope.selectedGroupId = selectedGroupId;
          $scope.groups = groups;

          $scope.updateGroup = function(){
            AuthService.user.groupId = $scope.selectedGroupId;
            UserService.update(AuthService.user)
              .then(function(){
                return AuthService.me();
              })
              .then(function(){
                $state.go('home');
              });

          };
        }
      })
      .state('loginRegister', {
        url: '/loginRegister',
        templateUrl: '/browser/templates/loginRegister.html',
        controller: function(AuthService, $state, $scope){
          $scope.login = function(){
            AuthService.login($scope.credentials)
              .then(function(){
                $state.go('settings');
              });
          };
        }
      });
    $urlRouterProvider.otherwise('/');
  });
