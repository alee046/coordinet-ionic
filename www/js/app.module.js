(function() {
  "use strict";

  angular
    .module("app", ["ionic",
      "uiGmapgoogle-maps",
      "ui.router",
      "btford.socket-io",
      "ionicMultipleViews"
    ])
    .constant("io", window.io)
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

})();
