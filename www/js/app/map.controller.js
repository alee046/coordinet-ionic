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

var markers=[];

    vm.emitLocation = function(){


      geolocateService.getCurrentPosition()
      .then(function(position) {
        vm.users.current.position.latitude = position.coords.latitude;
        vm.users.current.position.longitude = position.coords.longitude;
        $scope.map.center = vm.users.current.position;
        $scope.map.zoom = 12;
        $scope.map.markers = [];
        socketService.emit('location', vm.users.current);

        $scope.$on("socket:location", function(evt, data) {
          // $log.log("User located!", evt, data.position);
          vm.users.addUser(data);

        });

        // var createMarker = function (info){
        //   var marker = new google.maps.Marker({
        //   icon: info.icon,
        //   setMap: $scope.map,
        //   position: new google.maps.LatLng(info.position.latitude, info.position.longitude),
        //   id: info.id
        //   });
        //   $scope.map.markers.push(marker);

        // }

        //   angular.forEach(vm.users.all, function(user){
        //     // if (!$scope.map.markers[user.name]){
        //     createMarker(user);
        //   });
        //   // if ($scope.map.markers.name!= vm.users.current.name){

        //   createMarker(vm.users.current);

        // $scope.$on("socket:id", function(evt, data) {
        //   // $log.log("User located!", evt, data);
        //   vm.users.current.id=data;
        //   $log.log("BRUHH"+vm.users.current.id)
        // });

          angular.forEach(vm.users.all, function(user){
                     $scope.map.markers.push({
                                id: user.name,
                                coords: user.position,
                                icon: user.icon
            })
          });

          $scope.map.markers.push({
                                id: vm.users.current.name,
                                coords: vm.users.current.position,
                                icon: vm.users.current.icon
          })

      }).then(function(data){
        clearTimeout(sendLocationTimeout);
        sendLocationTimeout = setTimeout(vm.emitLocation, 1000*10);
      $log.log($scope.map.markers);
      $log.log('all the users are', vm.users.all);
      $log.log('the current users is', vm.users.current);

        // $scope.$on("socket:id", function(evt, data) {
        //   // $lo
      });
    }

    $scope.map = {
      center: {
        latitude:  34.06,
        longitude: -118.3
      },
      zoom: 10
    };

    // $log.log($scope.map.markers);
    uiGmapGoogleMapApi.then(function(map) {



    });
  }


})();
