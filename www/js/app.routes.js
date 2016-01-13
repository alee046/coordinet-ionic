(function() {
  "use strict";

  angular
    .module("app")
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('login', {
          url: "/login",
          templateUrl:  "templates/login.html",
          controller:   "LoginController",
          controllerAs: "vm"
        })
        .state('home', {
          url: "/home",
          templateUrl: 'templates/home.html',
        })
        .state('home.index', {
          url: "/1",
          views:{
              'map':{
            templateUrl:  "templates/map.html",
            controller:   "MapController",
            controllerAs: "vm"
              },
             'chat':{
              templateUrl: "templates/chat.html",
              controller: "ChatController",
              controllerAs: "vm"
             }
          }
        });


      $urlRouterProvider.otherwise("/login");
    });

})();


