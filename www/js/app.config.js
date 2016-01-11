(function() {
  "use strict";

  angular
    .module("app")
    .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        // key: 'AIzaSyCw8xNZUauJGQmOUIvMhiFkLSNhVtIXuoo',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
      });
    });

})();


