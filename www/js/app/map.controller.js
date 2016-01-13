(function() {


  angular
    .module("app")
    .controller("MapController", MapController);

  MapController.$inject = ["$log", "$scope", "uiGmapGoogleMapApi", "usersDataService", "geolocateService", "socketService", "$timeout"];

  function MapController($log, $scope, uiGmapGoogleMapApi, usersDataService, geolocateService, socketService, $timeout) {
    var vm = this;
    var sendLocationTimeout;
    vm.users = usersDataService;

    vm.markers = [
            {
            id: 0,
            coords: {
      latitude:  34.012938,
        longitude: -118.495122
            },
            icon: '../img/ga.png',
            message: "Meet And Hire today from 5:30-9:00!"
        },
        {
            id: 1,
            coords: {
                   latitude:  34.025799,
        longitude:  -118.483329
            },
            icon: '../img/Dozen_Donuts.png',
            message: "Special on a dozen of Cronuts today!"
        },
        {
            id: 2,
            coords: {
              latitude:  34.012900,
        longitude: -118.494122
            },
            icon: '../img/dollar.png',
            message: "Need help to move some stuff ? $50/ hr"
        },
                    {
            id: 3,
            coords: {
      latitude:  34.008614,
        longitude:  -118.498071
            },
            icon: '../img/question.png',
            message: "Special Performance on the pier @ 6PM"
        }
    ];
// var markers=[];

    vm.emitLocation = function(){


      geolocateService.getCurrentPosition()
      .then(function(position) {
        vm.users.current.position.latitude = position.coords.latitude;
        vm.users.current.position.longitude = position.coords.longitude;
        $scope.map.center = vm.users.current.position;
        // $scope.map.zoom = 12;

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
            var inArr= false;
            for(var i=0;i<vm.markers.length;i++){
              if(vm.markers[i].id == user.id){
                inArr=true;
              }
            }
            if (inArr == false){
                     vm.markers.push({
                                id: user.id,
                                coords: user.position,
                                icon: user.icon,
                                message: user.message

                      });
                   }
          });


      }).then(function(data){
        clearTimeout(sendLocationTimeout);
        sendLocationTimeout = setTimeout(vm.emitLocation, 1000*15);
        // $timeout(vm.emitLocation, 1000*10);

      $log.log('the markers are', vm.markers);
      $log.log('all the users are', vm.users.all);
      $log.log('the current users is', vm.users.current);

        // $scope.$on("socket:id", function(evt, data) {
        //   // $lo
      });
    }
    vm.markers.push({
                            id: vm.users.current.id,
                            coords: vm.users.current.position,
                            icon: vm.users.current.icon,
                            message: vm.users.current.message
      });

    $scope.MapOptions = {
        minZoom : 3,
        zoomControl : false,
        draggable : true,
        navigationControl : false,
        mapTypeControl : false,
        scaleControl : false,
        streetViewControl : false,
        disableDoubleClickZoom : false,
        keyboardShortcuts : true,
        styles : [{
          featureType : "poi",
          elementType : "labels",
          stylers : [{
            visibility : "off"
          }]
        }, {
          featureType : "transit",
          elementType : "all",
          stylers : [{
            visibility : "off"
          }]
        }],
    };

    //     $scope.markers = [
    //     {
    //         id: 0,
    //         coords: {
    //             latitude: 37.7749295,
    //             longitude: -122.4194155
    //         },
    //         data: 'restaurant'
    //     },
    //     {
    //         id: 1,
    //         coords: {
    //             latitude: 37.79,
    //             longitude: -122.42
    //         },
    //         data: 'house'
    //     },
    //     {
    //         id: 2,
    //         coords: {
    //             latitude: 37.77,
    //             longitude: -122.41
    //         },
    //         data: 'hotel'
    //     }
    // ];

    $log.log('the fiddle markers are ', $scope.markers);

    $scope.map = {
      center: {
        latitude:  34.06,
        longitude: -118.3
      },
      zoom: 10,
      pan:1,
      markers: vm.markers,
          markersEvents: {
              click: function(marker, eventName, model, arguments) {
                  $scope.map.window.model = model;
                  $scope.map.window.show = true;
              }
          },
          window: {
              marker: {},
              show: false,
              closeClick: function() {
                  this.show = false;
              },
              options: {} // define when map is ready
          },

      options: $scope.mapOptions,
      control:{}

    };

    // $log.log($scope.map.markers);
    uiGmapGoogleMapApi.then(function(map) {

$scope.map.window.options.pixelOffset = new google.maps.Size(0, -35, 'px', 'px');



    });
  }


})();
