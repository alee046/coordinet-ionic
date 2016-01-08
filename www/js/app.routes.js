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
        .state('map', {
          url: "/map",
          templateUrl:  "templates/map.html",
          controller:   "MapController",
          controllerAs: "vm"
        });

      $urlRouterProvider.otherwise("/login");
    });

})();


