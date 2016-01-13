(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$log", "$state", "usersDataService", "socketService"];

  function LoginController($log, $state, usersDataService, socketService) {
    var vm = this;

    vm.users = usersDataService;

    vm.loadUser = function() {
      $log.log("Loading:", {
        id:     vm.users.current.id,
        name:   vm.users.current.name,
        icon: vm.users.current.icon,
        message: vm.users.current.message
      });
      $log.log(vm.users);
      $state.go("home.index");
    }
  }

})();
