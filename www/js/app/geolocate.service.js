(function() {
  "use strict";

  angular
    .module("app")
    .factory("geolocateService", geolocateService);

  geolocateService.$inject = ['$log', '$window', '$q'];

  function geolocateService($log, $window, $q) {
    var geolocate = {
      getCurrentPosition: function() {
        $log.log("Beginning geolocation…");

        return $q(function(resolve, reject) {
          $window.navigator.geolocation.getCurrentPosition(function(position) {
            $log.log("Position acquired:", position);
            resolve(position);
          });
        });
      }
    };

    return geolocate;
  }

})();
