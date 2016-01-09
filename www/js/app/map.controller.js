(function() {
  "use strict";

  angular
    .module("app")
    .controller("MapController", MapController);

  MapController.$inject = ["$log", "$scope", "uiGmapGoogleMapApi", "usersDataService", "geolocateService", "socketService"];

  function MapController($log, $scope, uiGmapGoogleMapApi, usersDataService, geolocateService, socketService) {
    var vm = this;
    var sendLocationTimeout;
    vm.users = usersDataService;

    vm.emitLocation = function(){
      geolocateService.getCurrentPosition()
      .then(function(position) {
        vm.users.current.position.latitude = position.coords.latitude;
        vm.users.current.position.longitude = position.coords.longitude;

        $scope.map.center = vm.users.current.position;

        $scope.map.zoom = 14;

        socketService.emit('location', vm.users.current);

        $scope.$on("socket:location", function(evt, data) {
          // $log.log("User located!", evt, data);
          vm.users.addUser(data);

        });
        // vm.users.all.foEach() //==
        // vm.users.current() //==marker
      }).then(function(data){
        clearTimeout(sendLocationTimeout);
        sendLocationTimeout = setTimeout(vm.emitLocation, 1000*10);
      });
    }

    $scope.map = {
      center: {
        latitude:  34.06,
        longitude: -118.3
      },
      zoom: 12
    };

    uiGmapGoogleMapApi.then(function(map) {


    });
  }


})();
