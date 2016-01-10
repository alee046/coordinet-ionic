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
        $scope.markers = [];
        $scope.map.center = vm.users.current.position;

        $scope.map.zoom = 12;

        socketService.emit('location', vm.users.current);

        $scope.$on("socket:location", function(evt, data) {
          // $log.log("User located!", evt, data.position);
          vm.users.addUser(data);


        });

          angular.forEach(vm.users.all, function(user){
                     $scope.markers.push({
                                id: user.name,
                                coords: user.position,
                                icon: user.icon
            })
          });

          $scope.markers.push({
                                id: vm.users.current.name,
                                coords: vm.users.current.position,
                                icon: vm.users.current.icon
          })


        // $scope.$on("socket:id", function(evt, data) {
        //   // $log.log("User located!", evt, data);
        //   vm.users.current.id=data;
        //   $log.log("BRUHH"+vm.users.current.id)
        // });


      }).then(function(data){
        clearTimeout(sendLocationTimeout);
        sendLocationTimeout = setTimeout(vm.emitLocation, 1000*10);
      $log.log($scope.markers)
      $log.log('all the users are', vm.users.all);
      $log.log('the current users is', vm.users.current);

      });
    }

    $scope.map = {
      center: {
        latitude:  34.06,
        longitude: -118.3
      },
      zoom: 10
    };

    uiGmapGoogleMapApi.then(function(map) {

      // $log.log($scope.markers)
      // $log.log('all the users are', vm.users.all);
      // $log.log('the current users is', vm.users.current);

    });
  }


})();
